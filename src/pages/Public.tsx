import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { 
  Users, 
  Heart, 
  MapPin, 
  Activity,
  AlertTriangle,
  Ambulance,
  Home,
  Utensils,
  Droplet,
  Zap,
  ChevronLeft,
  Send,
  Upload,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";

const Public = () => {
  const [helpRequest, setHelpRequest] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  const emergencyResources = [
    { 
      type: "Medical/Oxygen", 
      icon: Heart, 
      status: "available", 
      count: "12 Units", 
      location: "2.3 km away",
      color: "text-success"
    },
    { 
      type: "Medicine", 
      icon: Activity, 
      status: "limited", 
      count: "3 Types", 
      location: "1.8 km away",
      color: "text-warning"
    },
    { 
      type: "Food Supply", 
      icon: Utensils, 
      status: "available", 
      count: "Adequate", 
      location: "0.5 km away",
      color: "text-success"
    },
    { 
      type: "Water", 
      icon: Droplet, 
      status: "available", 
      count: "Clean Supply", 
      location: "1.2 km away",
      color: "text-success"
    },
    { 
      type: "Shelter", 
      icon: Home, 
      status: "limited", 
      count: "5 Beds", 
      location: "3.1 km away",
      color: "text-warning"
    },
    { 
      type: "Electricity", 
      icon: Zap, 
      status: "unavailable", 
      count: "Outage", 
      location: "Area-wide",
      color: "text-destructive"
    },
    { 
      type: "Ambulance", 
      icon: Ambulance, 
      status: "available", 
      count: "2 Available", 
      location: "5 min ETA",
      color: "text-success"
    },
    { 
      type: "Hospital", 
      icon: Heart, 
      status: "available", 
      count: "3 Facilities", 
      location: "4.2 km away",
      color: "text-success"
    }
  ];

  const recentAlerts = [
    {
      type: "Medical Emergency",
      message: "Blood donation drive at Central Hospital",
      time: "2 hours ago",
      priority: "medium",
      icon: Heart
    },
    {
      type: "Water Distribution",
      message: "Clean water available at Community Center",
      time: "4 hours ago", 
      priority: "low",
      icon: Droplet
    },
    {
      type: "Power Outage",
      message: "Electricity restored in Sector 5",
      time: "6 hours ago",
      priority: "medium",
      icon: Zap
    }
  ];

  const myRequests = [
    {
      id: "REQ001",
      type: "Medical Help",
      description: "Need oxygen cylinder for elderly patient",
      status: "approved",
      time: "1 hour ago"
    },
    {
      id: "REQ002", 
      type: "Food Supply",
      description: "Request for food supplies for family of 4",
      status: "pending",
      time: "3 hours ago"
    },
    {
      id: "REQ003",
      type: "Shelter",
      description: "Temporary accommodation needed",
      status: "rejected",
      time: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success text-success-foreground';
      case 'limited': return 'bg-warning text-warning-foreground';
      case 'unavailable': return 'bg-destructive text-destructive-foreground';
      case 'approved': return 'bg-success text-success-foreground';
      case 'pending': return 'bg-warning text-warning-foreground';
      case 'rejected': return 'bg-destructive text-destructive-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
      default: return 'border-l-muted';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-success rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-success-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Public Portal</h1>
                  <p className="text-sm text-muted-foreground">Emergency Assistance Hub</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emergency Resources Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Emergency Resources Availability</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {emergencyResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-muted ${resource.color}`}>
                          <resource.icon className="h-5 w-5" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{resource.type}</div>
                          <div className="text-sm text-muted-foreground">{resource.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-foreground">{resource.count}</div>
                        <Badge className={getStatusColor(resource.status)}>
                          {resource.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Recent Alerts & Updates</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert, index) => (
                    <div key={index} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(alert.priority)}`}>
                      <div className="flex items-start space-x-3">
                        <div className="p-2 rounded-lg bg-background">
                          <alert.icon className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-foreground">{alert.type}</h4>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{alert.message}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help Request & Profile Section */}
          <div className="space-y-8">
            {/* Request Help Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span>Request Help</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Your Location
                  </label>
                  <Input
                    placeholder="Enter your current location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Describe Your Emergency
                  </label>
                  <Textarea
                    placeholder="Please describe what help you need..."
                    value={helpRequest}
                    onChange={(e) => setHelpRequest(e.target.value)}
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Upload Verification Images (AI will verify)
                  </label>
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    Upload photos to verify your need for resources
                  </p>
                </div>

                <Button className="w-full bg-gradient-success">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </CardContent>
            </Card>

            {/* My Requests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>My Requests</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRequests.map((request, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-foreground">#{request.id}</div>
                        <Badge className={getStatusColor(request.status)}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                      <div className="text-sm text-foreground font-medium mb-1">{request.type}</div>
                      <div className="text-sm text-muted-foreground mb-2">{request.description}</div>
                      <div className="text-xs text-muted-foreground">{request.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Heart className="h-5 w-5" />
                  <span>Emergency Contacts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Ambulance className="h-4 w-4 mr-2" />
                  Emergency Services - 108
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Medical Helpline - 104
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Crisis Helpline - 112
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Public;