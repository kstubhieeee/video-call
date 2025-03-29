'use client';

import { useState, useCallback } from 'react';
import VideoCall from './components/VideoCall';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './components/ui/card';
import { Video, Mic, Users } from 'lucide-react';

export default function Home() {
  const [roomID, setRoomID] = useState('');
  const [userName, setUserName] = useState('');
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinRoom = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (roomID && userName) {
      setIsJoined(true);
    }
  }, [roomID, userName]);

  const handleCreateRoom = useCallback(() => {
    // Generate a random room ID
    const newRoomID = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomID(newRoomID);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {!isJoined ? (
        <div className="flex items-center justify-center min-h-screen p-4">
          <Card className="w-full max-w-md bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white">
                <div className="flex items-center justify-center gap-2">
                  <Video className="w-6 h-6" />
                  <span>Video Call</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleJoinRoom} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Room ID</label>
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      value={roomID}
                      onChange={(e) => setRoomID(e.target.value)}
                      placeholder="Enter Room ID"
                      className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                      required
                    />
                    <Button
                      type="button"
                      onClick={handleCreateRoom}
                      variant="secondary"
                      className="bg-green-600 hover:bg-green-700 text-white"
                    >
                      Create
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-200">Your Name</label>
                  <Input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Enter your name"
                    className="bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Join Room
                </Button>
              </form>
              {roomID && (
                <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-blue-800">
                  <p className="text-sm text-blue-300 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Share this Room ID with others to join: <span className="font-bold">{roomID}</span>
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="w-full h-screen">
          <VideoCall
            roomID={roomID}
            userID={`user-${Math.random().toString(36).substr(2, 9)}`}
            userName={userName}
          />
        </div>
      )}
    </div>
  );
}
