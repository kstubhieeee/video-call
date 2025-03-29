'use client';

import { useEffect, useRef, useState } from 'react';
import { ZEGO_CONFIG } from '../config/zego';
import { Button } from './ui/button';
import { AlertCircle, RefreshCw, PhoneOff } from 'lucide-react';

interface VideoCallProps {
  roomID: string;
  userID: string;
  userName: string;
}

export default function VideoCall({ roomID, userID, userName }: VideoCallProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [isPreJoinView, setIsPreJoinView] = useState(true);
  const zegoInstanceRef = useRef<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const stopAllTracks = () => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => {
        track.stop();
      });
      mediaStreamRef.current = null;
    }
  };

  useEffect(() => {
    if (!containerRef.current) return;

    let mounted = true;
    let cleanupPromise: Promise<void> | null = null;

    const checkPermissions = async () => {
      try {
        // Check camera permission
        const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStream.getTracks().forEach(track => track.stop());

        // Check microphone permission
        const micStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStream.getTracks().forEach(track => track.stop());

        return true;
      } catch (error: any) {
        if (mounted) {
          setPermissionError(
            error.name === 'NotAllowedError' 
              ? 'Please allow camera and microphone access to join the call'
              : 'Failed to access camera or microphone'
          );
        }
        return false;
      }
    };

    const initializeZego = async () => {
      try {
        // Check permissions first
        const hasPermissions = await checkPermissions();
        if (!hasPermissions) return;

        // Dynamically import ZegoUIKitPrebuilt
        const { ZegoUIKitPrebuilt } = await import('@zegocloud/zego-uikit-prebuilt');

        // Clean up existing instance if any
        if (zegoInstanceRef.current) {
          try {
            await zegoInstanceRef.current.destroy();
          } catch (error) {
            console.error('Error destroying previous instance:', error);
          }
        }

        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          ZEGO_CONFIG.appID,
          ZEGO_CONFIG.serverSecret,
          roomID,
          userID,
          userName
        );

        const zp = ZegoUIKitPrebuilt.create(kitToken);
        zegoInstanceRef.current = zp;
        
        if (!mounted) return;

        await zp.joinRoom({
          container: containerRef.current,
          scenario: {
            mode: ZegoUIKitPrebuilt.OneONoneCall,
            config: {
              turnOnMicrophoneWhenJoining: true,
              turnOnCameraWhenJoining: true,
              showMyMicrophoneUnmutedIndicator: true,
              showMyCameraUnmutedIndicator: true,
              showMyMicrophoneMutedIndicator: true,
              showMyCameraMutedIndicator: true,
              showAudioVideoSettingsButton: true,
              showScreenSharingButton: true,
              showTextChat: true,
              showUserList: true,
              maxUsers: 2,
              layout: 'Grid',
              showLayoutButton: true,
              showNonVideoUser: true,
              showOnlyAudioUser: true,
              showPinButton: true,
              showSpeaker: true,
              showMicrophoneButton: true,
              showCameraButton: true,
              showEndCallButton: true,
              showToggleMicButton: true,
              showToggleCameraButton: true,
              showLeaveButton: true,
            },
          },
          showPreJoinView: true,
          onJoinRoom: () => {
            if (mounted) {
              setIsJoined(true);
              setIsPreJoinView(false);
              setError(null);
              setPermissionError(null);
            }
          },
          onLeaveRoom: () => {
            if (mounted) {
              setIsJoined(false);
              setIsPreJoinView(true);
              stopAllTracks();
            }
          },
          onPreJoinViewReady: () => {
            if (mounted) {
              setIsPreJoinView(true);
            }
          },
        });
      } catch (error: any) {
        console.error('Error joining room:', error);
        if (mounted) {
          setIsJoined(false);
          setIsPreJoinView(true);
          setError(error.message || 'Failed to join room');
          stopAllTracks();
        }
      }
    };

    initializeZego();

    // Cleanup function
    return () => {
      mounted = false;
      stopAllTracks();
      if (zegoInstanceRef.current) {
        try {
          cleanupPromise = zegoInstanceRef.current.destroy();
          if (cleanupPromise) {
            cleanupPromise.catch((error: any) => {
              console.error('Error during cleanup:', error);
            });
          }
        } catch (error) {
          console.error('Error during cleanup:', error);
        }
      }
    };
  }, [roomID, userID, userName]);

  return (
    <div className="w-full h-screen bg-gray-900">
      <div ref={containerRef} className="w-full h-full" />
      {(!isJoined && !isPreJoinView) || permissionError ? (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/80 backdrop-blur-sm">
          <div className="text-white text-xl">
            {permissionError ? (
              <div className="text-red-500 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  <p>{permissionError}</p>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </Button>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <AlertCircle className="w-6 h-6" />
                  <p>Error: {error}</p>
                </div>
                <Button
                  onClick={() => window.location.reload()}
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Retry
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-6 h-6 animate-spin" />
                <span>Joining room...</span>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
} 