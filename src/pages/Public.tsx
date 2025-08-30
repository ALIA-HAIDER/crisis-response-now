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
  XCircle,
  Eye,
  Filter,
  ArrowUpDown,
  Search,
  Download,
  MessageCircle
} from "lucide-react";
import { isGovernment } from "@/lib/auth";
import axios from "axios";

const Public = () => {
  const [helpRequest, setHelpRequest] = useState("");
  const [location, setLocation] = useState("");
  const navigate = useNavigate();

  // Shared Resources state
  const [sharedResources, setSharedResources] = useState<Array<{
    id: string;
    type: string;
    description: string;
    location: string;
    contact: string;
    time: string;
  }>>([]);

  // Share Resource form fields
  const [shareType, setShareType] = useState("Food");
  const [shareLocation, setShareLocation] = useState("");
  const [shareDesc, setShareDesc] = useState("");
  const [shareContact, setShareContact] = useState("");
  const [sharePicture, setSharePicture] = useState<File | null>(null);
  const [shareMsg, setShareMsg] = useState("");

  // Connect message state
  const [connectMsg, setConnectMsg] = useState("");

  // Handle Share Resource
  const handleShareResource = async () => {
    if (!shareType || !shareLocation || !shareDesc || !shareContact) {
      setShareMsg("Please fill all fields to share a resource.");
      return;
    }
    let apiResult = null;
    if (sharePicture) {
      const formData = new FormData();
      formData.append("images", sharePicture);
      formData.append("claim", shareDesc || shareType);
      try {
        const res = await axios.post("http://127.0.0.1:5000/detect", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        apiResult = res.data;
      } catch (err) {
        setShareMsg("Image verification failed. Please try again.");
        return;
      }
    }
    // Optionally handle picture upload (for demo, just store file name)
    const newResource = {
      id: `SR-${Date.now()}`,
      type: shareType,
      description: shareDesc,
      location: shareLocation,
      contact: shareContact,
      time: "just now",
      picture: sharePicture ? sharePicture.name : null,
      verification: apiResult || null
    };
    setSharedResources(prev => [newResource, ...prev]);
    setShareMsg(apiResult ? (apiResult.claim_correct ? "Resource verified and shared!" : `Verification failed: ${apiResult.reason}`) : "Resource shared successfully!");
    setShareType("Food");
    setShareLocation("");
    setShareDesc("");
    setShareContact("");
    setSharePicture(null);
    setTimeout(() => setShareMsg(""), 4000);
  };

  // Handle Connect
  const handleConnect = (r: any) => {
    setConnectMsg(`Connection request sent to ${r.requester}!`);
    setTimeout(() => setConnectMsg(""), 3000);
  };

  // Mocked aggregated public requests (Gov review)
  type ReqType = "medical" | "food" | "water" | "shelter" | "power" | "ambulance";
  type Urgency = "low" | "medium" | "high" | "critical";
  type ReqStatus = "pending" | "approved" | "rejected";

  // Form fields: add type and urgency
  const [newReqType, setNewReqType] = useState<ReqType>("medical");
  const [newUrgency, setNewUrgency] = useState<Urgency>("medium");

  // Replace const myRequests with editable state
  const [myRequests, setMyRequests] = useState<Array<{
    id: string; type: string; description: string; status: ReqStatus; time: string;
  }>>([
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
  ]);

  // Gov filters: add status + search
  const [govFilterType, setGovFilterType] = useState<"all" | ReqType>("all");
  const [govFilterStatus, setGovFilterStatus] = useState<"all" | ReqStatus>("all");
  const [govSearch, setGovSearch] = useState("");
  const [govSortBy, setGovSortBy] = useState<"urgency" | "type" | "time" | "requirement">("urgency");
  const [govSortDir, setGovSortDir] = useState<"asc" | "desc">("desc");
  const [govSelected, setGovSelected] = useState<string | null>(null);

  const [publicRequests, setPublicRequests] = useState<Array<{
    id: string;
    requester: string;
    reqType: ReqType;
    urgency: Urgency;
    status: ReqStatus;
    location: string;
    description: string;
    submittedAt: number; // epoch ms
  }>>([
    { id: "PR-101", requester: "Ananya S", reqType: "medical", urgency: "high", status: "pending", location: "Sector 12, Indiranagar", description: "Oxygen support and basic medicines required for elderly", submittedAt: Date.now() - 1000 * 60 * 35 },
    { id: "PR-102", requester: "Rahul M", reqType: "food", urgency: "medium", status: "pending", location: "JP Nagar Community Hall", description: "Food kits for 6 people", submittedAt: Date.now() - 1000 * 60 * 120 },
    { id: "PR-103", requester: "Zoya K", reqType: "shelter", urgency: "high", status: "approved", location: "Old Town School", description: "Temporary shelter required (2 adults, 1 child)", submittedAt: Date.now() - 1000 * 60 * 15 },
    { id: "PR-104", requester: "Karthik", reqType: "water", urgency: "critical", status: "pending", location: "Riverfront Camp", description: "Clean water shortage for 20+ people", submittedAt: Date.now() - 1000 * 60 * 240 },
    { id: "PR-105", requester: "Fatima", reqType: "power", urgency: "medium", status: "rejected", location: "Sector 7", description: "Power backup for medical equipment", submittedAt: Date.now() - 1000 * 60 * 360 },
    { id: "PR-106", requester: "Aman", reqType: "ambulance", urgency: "high", status: "pending", location: "City Mall Gate 2", description: "Ambulance for injury, heavy bleeding", submittedAt: Date.now() - 1000 * 60 * 5 },
  ]);

  const urgencyScore = (u: Urgency) => (u === "critical" ? 4 : u === "high" ? 3 : u === "medium" ? 2 : 1);
  // Requirement priority (ambulance > medical > water > shelter > food > power)
  const requirementPriority: Record<ReqType, number> = {
    ambulance: 6, medical: 5, water: 4, shelter: 3, food: 2, power: 1
  };
  const formatAgo = (ts: number) => {
    const mins = Math.max(1, Math.floor((Date.now() - ts) / 60000));
    return mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`;
    };
  const typeIcon = (t: ReqType) =>
    t === "medical" ? Heart :
    t === "food" ? Utensils :
    t === "water" ? Droplet :
    t === "shelter" ? Home :
    t === "power" ? Zap :
    Ambulance;

  const urgencyBadge = (u: Urgency) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border";
    if (u === "critical") return `${base} bg-destructive/10 text-destructive border-destructive/30`;
    if (u === "high") return `${base} bg-destructive/10 text-destructive border-destructive/20`;
    if (u === "medium") return `${base} bg-warning/10 text-warning border-warning/20`;
    return `${base} bg-success/10 text-success border-success/20`;
  };

  const filteredSorted = publicRequests
    .filter(r => govFilterType === "all" ? true : r.reqType === govFilterType)
    .filter(r => govFilterStatus === "all" ? true : r.status === govFilterStatus)
    .filter(r => {
      if (!govSearch.trim()) return true;
      const q = govSearch.toLowerCase();
      return (
        r.id.toLowerCase().includes(q) ||
        r.requester.toLowerCase().includes(q) ||
        r.location.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
      );
    })
    .slice()
    .sort((a, b) => {
      const dir = govSortDir === "asc" ? 1 : -1;
      if (govSortBy === "urgency") return (urgencyScore(a.urgency) - urgencyScore(b.urgency)) * dir;
      if (govSortBy === "type") return a.reqType.localeCompare(b.reqType) * dir;
      if (govSortBy === "requirement") return (requirementPriority[a.reqType] - requirementPriority[b.reqType]) * dir;
      // time
      return (a.submittedAt - b.submittedAt) * dir;
    });

  const updateStatus = (id: string, status: ReqStatus) =>
    setPublicRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  // Export current view to CSV
  const exportGovCSV = () => {
    const head = ["id","requester","type","urgency","status","location","description","submittedAt"].join(",");
    const rows = filteredSorted.map(r => [
      r.id, r.requester, r.reqType, r.urgency, r.status,
      `"${r.location.replace(/"/g,'""')}"`,
      `"${r.description.replace(/"/g,'""')}"`,
      new Date(r.submittedAt).toISOString()
    ].join(","));
    const csv = [head, ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "public-requests.csv"; a.click();
    URL.revokeObjectURL(url);
  };

  // Submit public request: push to publicRequests and myRequests
  const submitPublicRequest = () => {
    if (!location.trim() || !helpRequest.trim()) return;
    const newIdNum = Math.floor(100 + Math.random() * 900);
    const reqId = `PR-${newIdNum}`;
    const now = Date.now();

    setPublicRequests(prev => [
      {
        id: reqId,
        requester: "You",
        reqType: newReqType,
        urgency: newUrgency,
        status: "pending",
        location: location.trim(),
        description: helpRequest.trim(),
        submittedAt: now
      },
      ...prev
    ]);

    const myId = `REQ${String(myRequests.length + 1).padStart(3, "0")}`;
    setMyRequests(prev => [
      { id: myId, type: newReqType[0].toUpperCase() + newReqType.slice(1), description: helpRequest.trim(), status: "pending", time: "just now" },
      ...prev
    ]);

    // reset form fields
    setHelpRequest("");
    setLocation("");
    setNewReqType("medical");
    setNewUrgency("medium");
  };

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-success/20 text-success border-success/30';
      case 'limited': return 'bg-warning/20 text-warning border-warning/30';
      case 'unavailable': return 'bg-destructive/20 text-destructive border-destructive/30';
      case 'approved': return 'bg-success/20 text-success border-success/30';
      case 'pending': return 'bg-warning/20 text-warning border-warning/30';
      case 'rejected': return 'bg-destructive/20 text-destructive border-destructive/30';
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
      case 'high': return 'border-l-destructive bg-destructive/10';
      case 'medium': return 'border-l-warning bg-warning/10';
      case 'low': return 'border-l-success bg-success/10';
      default: return 'border-l-muted bg-muted/10';
    }
  };

  // Simple FAQ chatbot logic
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{ user: string; bot: string }>>([]);
  const [showChatbot, setShowChatbot] = useState(false);
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState("");
  const sessionId = "1"; // You can make this dynamic if needed

  const handleChatSend = async () => {
    if (!chatInput.trim()) return;
    setChatLoading(true);
    setChatError("");
    const userQ = chatInput.trim();
    setChatHistory((prev) => [...prev, { user: userQ, bot: "..." }]);
    setChatInput("");
    try {
      const res = await axios.post("http://127.0.0.1:5000/chat", {
        session_id: sessionId,
        message: userQ,
      });
      const botA = res.data.response || "Sorry, no answer received.";
      setChatHistory((prev) => {
        // Replace last bot message ("...") with real answer
        const last = prev.pop();
        return [...prev, { user: last.user, bot: botA }];
      });
    } catch (err) {
      setChatHistory((prev) => {
        const last = prev.pop();
        return [...prev, { user: last.user, bot: "Error: Could not get response. Please try again." }];
      });
      setChatError("Failed to get response from emergency advice API.");
    } finally {
      setChatLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted text-foreground relative">
      {/* Emergency Chatbot Floating Button */}
      <button
        className="fixed bottom-8 right-8 z-50 bg-primary text-primary-foreground rounded-full shadow-lg p-4 flex items-center justify-center hover:bg-primary/80 transition"
        onClick={() => setShowChatbot(true)}
        aria-label="Open Emergency Chatbot"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
      Emergency Chatbot Modal
      {showChatbot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-card/90 rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-3 right-3 text-muted-foreground hover:text-destructive"
              onClick={() => setShowChatbot(false)}
              aria-label="Close Chatbot"
            >
              <XCircle className="h-6 w-6" />
            </button>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground text-xl font-bold">
                <MessageCircle className="h-5 w-5 text-primary" />
                <span>Emergency FAQ Chatbot 🤖</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-40 overflow-y-auto bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                  {chatHistory.length === 0 && (
                    <div className="text-muted-foreground">Ask any emergency question, e.g. "I am having a bleed in my right arm"</div>
                  )}
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="font-semibold text-primary">You: <span className="font-normal text-foreground">{msg.user}</span></div>
                      <div className="font-semibold text-success">Bot: <span className="font-normal text-foreground whitespace-pre-line">{msg.bot}</span></div>
                    </div>
                  ))}
                  {chatLoading && <div className="text-xs text-muted-foreground">Getting advice...</div>}
                  {chatError && <div className="text-xs text-destructive">{chatError}</div>}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your emergency question..."
                    className="bg-muted text-foreground border-none"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
                    disabled={chatLoading}
                  />
                  <Button onClick={handleChatSend} className="bg-primary text-primary-foreground font-bold" disabled={chatLoading}>Send</Button>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      )}
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur shadow-lg">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')} className="border-border text-muted-foreground hover:bg-primary/10">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-[var(--shadow-elegant)]">
                  <Users className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-3xl font-extrabold text-foreground tracking-tight">Public Portal 🚀</h1>
                  <p className="text-base text-muted-foreground font-medium">GenZ Emergency Assistance Hub</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:bg-primary/10">
                <MapPin className="h-4 w-4 mr-2" />
                Share Location
              </Button>
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-gradient-primary rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Chatbot Section
        <div className="max-w-md mx-auto mb-8">
          <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground text-xl font-bold">
                <Users className="h-5 w-5 text-primary" />
                <span>Emergency FAQ Chatbot 🤖</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-40 overflow-y-auto bg-muted rounded-lg p-3 text-sm text-muted-foreground">
                  {chatHistory.length === 0 && (
                    <div className="text-muted-foreground">Ask questions like "How to purify water?" or "What to do in heart attack?"</div>
                  )}
                  {chatHistory.map((msg, idx) => (
                    <div key={idx} className="mb-2">
                      <div className="font-semibold text-primary">You: <span className="font-normal text-foreground">{msg.user}</span></div>
                      <div className="font-semibold text-success">Bot: <span className="font-normal text-foreground">{msg.bot}</span></div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 mt-2">
                  <Input
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    placeholder="Type your question..."
                    className="bg-muted text-foreground border-none"
                    onKeyDown={(e) => { if (e.key === 'Enter') handleChatSend(); }}
                  />
                  <Button onClick={handleChatSend} className="bg-primary text-primary-foreground font-bold">Send</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Emergency Resources Dashboard */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Activity className="h-6 w-6 text-primary" />
                  <span>Resources Near You ✨</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {emergencyResources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-5 rounded-xl bg-card/70 shadow-[var(--shadow-card)] hover:scale-[1.03] transition-transform duration-200">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-xl bg-gradient-primary shadow-[var(--shadow-card)]`}>
                          <resource.icon className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="font-bold text-lg text-foreground">{resource.type}</div>
                          <div className="text-sm text-muted-foreground">{resource.location}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-foreground">{resource.count}</div>
                        <Badge className={getStatusColor(resource.status) + " rounded-full px-3 py-1 text-base"}>
                          {resource.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-emergency)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <AlertTriangle className="h-6 w-6 text-destructive" />
                  <span>Alerts & Updates 🔔</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <>
                    {recentAlerts.map((alert, index) => (
                      <div key={index} className={`p-5 border-l-4 rounded-xl ${getPriorityColor(alert.priority)} shadow-[var(--shadow-emergency]`}>
                        <div className="flex items-start space-x-4">
                          <div className="p-3 rounded-xl bg-gradient-emergency">
                            <alert.icon className="h-5 w-5 text-destructive" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-foreground">{alert.type}</h4>
                              <span className="text-xs text-muted-foreground">{alert.time}</span>
                            </div>
                            <p className="text-base text-muted-foreground mt-1">{alert.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    <Button className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl shadow-[var(--shadow-card)] hover:scale-105 transition-transform"
                      onClick={handleShareResource}>
                      <Upload className="h-5 w-5 mr-2" />
                      Share Resource
                    </Button>
                    {shareMsg && <div className="text-xs text-success mt-2">{shareMsg}</div>}
                  </>
                </div>
              </CardContent>
            </Card>
            {/* Shared Resources Section */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Upload className="h-6 w-6 text-primary" />
                  <span>Share Your Spare 💡</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Resource Type</label>
                    <select
                      value={shareType}
                      onChange={e => setShareType(e.target.value)}
                      className="w-full h-10 px-3 rounded-xl border-none bg-muted text-foreground text-base focus:ring-2 focus:ring-primary"
                    >
                      <option>Food</option>
                      <option>Water</option>
                      <option>Medicine</option>
                      <option>Shelter</option>
                      <option>Ambulance</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Location</label>
                    <Input placeholder="Where is it available?" value={shareLocation} onChange={e => setShareLocation(e.target.value)} className="rounded-xl bg-muted text-foreground border-none" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Description</label>
                  <Textarea
                    placeholder="Describe what and how much you can share..."
                    value={shareDesc}
                    onChange={e => setShareDesc(e.target.value)}
                    rows={3}
                    className="rounded-xl bg-muted text-foreground border-none"
                  />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Contact Number</label>
                  <Input placeholder="Your phone or WhatsApp" value={shareContact} onChange={e => setShareContact(e.target.value)} className="rounded-xl bg-muted text-foreground border-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Upload Picture (optional)</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => setSharePicture(e.target.files ? e.target.files[0] : null)}
                    className="block w-full text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                  />
                  {sharePicture && (
                    <div className="text-xs text-success mt-1">Selected: {sharePicture.name}</div>
                  )}
                </div>
                <Button className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl shadow-[var(--shadow-card)] hover:scale-105 transition-transform" onClick={handleShareResource}>
                  <Upload className="h-5 w-5 mr-2" />
                  Share Resource
                </Button>
                {shareMsg && <div className="text-xs text-success mt-2">{shareMsg}</div>}
              </CardContent>
            </Card>

            {/* Local Requests Section */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Users className="h-6 w-6 text-primary" />
                  <span>Local Requests 🤝</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {publicRequests.map(r => {
                    const Icon = typeIcon(r.reqType);
                    return (
                      <div key={r.id} className="p-4 rounded-xl bg-card/70 shadow-[var(--shadow-card)] flex items-center justify-between hover:scale-[1.02] transition-transform">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-xl bg-gradient-primary">
                            <Icon className="h-5 w-5 text-primary-foreground" />
                          </div>
                          <div>
                            <div className="text-lg font-bold text-foreground">
                              {r.requester} • <span className="capitalize">{r.reqType}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {r.location} • {formatAgo(r.submittedAt)}
                            </div>
                            <div className="text-xs text-muted-foreground">{r.description}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={urgencyBadge(r.urgency) + " font-bold"}>{r.urgency}</span>
                          <Badge className={getStatusColor(r.status) + " rounded-full px-3 py-1 text-base"}>
                            {getStatusIcon(r.status)}
                            <span className="ml-1 capitalize">{r.status}</span>
                          </Badge>
                          <Button size="sm" variant="outline" className="border-primary text-primary font-bold hover:bg-primary/10" onClick={() => handleConnect(r)}>
                            Connect
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {publicRequests.length === 0 && (
                    <div className="text-sm text-muted-foreground">No local requests found.</div>
                  )}
                  {connectMsg && (
                    <div className="text-xs text-success mt-2">{connectMsg}</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Shared Resources List */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Activity className="h-6 w-6 text-primary" />
                  <span>Shared by Locals 🫶</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sharedResources.map(res => (
                    <div key={res.id} className="p-4 rounded-xl bg-card/70 shadow-[var(--shadow-card)] flex items-center justify-between">
                      <div>
                        <div className="font-bold text-lg text-foreground">{res.type}</div>
                        <div className="text-xs text-muted-foreground">{res.description}</div>
                        <div className="text-xs text-muted-foreground">Location: {res.location}</div>
                        <div className="text-xs text-muted-foreground">Contact: {res.contact}</div>
                        <div className="text-xs text-muted-foreground">{res.time}</div>
                      </div>
                    </div>
                  ))}
                  {sharedResources.length === 0 && (
                    <div className="text-sm text-muted-foreground">No shared resources yet.</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Help Request & Profile Section */}
          <div className="space-y-8">
            {/* Request Help Form */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Send className="h-6 w-6 text-primary" />
                  <span>Request Help 🆘</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Your Location</label>
                    <Input placeholder="Enter your current location" value={location} onChange={(e) => setLocation(e.target.value)} className="rounded-xl bg-muted text-foreground border-none" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-2 block">Requirement Type</label>
                    <select
                      value={newReqType}
                      onChange={(e) => setNewReqType(e.target.value as ReqType)}
                      className="w-full h-10 px-3 rounded-xl border-none bg-muted text-foreground text-base focus:ring-2 focus:ring-primary"
                    >
                      <option value="medical">Medical</option>
                      <option value="ambulance">Ambulance</option>
                      <option value="water">Water</option>
                      <option value="shelter">Shelter</option>
                      <option value="food">Food</option>
                      <option value="power">Power</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-foreground mb-2 block">Describe Your Emergency</label>
                  <Textarea
                    placeholder="Please describe what help you need..."
                    value={helpRequest}
                    onChange={(e) => setHelpRequest(e.target.value)}
                    rows={4}
                    className="rounded-xl bg-muted text-foreground border-none"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-semibold text-foreground">Urgency</label>
                    <select
                      value={newUrgency}
                      onChange={(e) => setNewUrgency(e.target.value as Urgency)}
                      className="w-full h-10 px-3 rounded-xl border-none bg-muted text-foreground text-base focus:ring-2 focus:ring-primary"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-foreground">Upload Verification Images (optional)</label>
                    <Button variant="outline" className="w-full border-primary text-primary font-bold hover:bg-primary/10 rounded-xl">
                      <Upload className="h-5 w-5 mr-2" />
                      Upload Images
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      Upload photos to verify your need for resources
                    </p>
                  </div>
                </div>

                <Button className="w-full bg-gradient-primary text-primary-foreground font-bold rounded-xl shadow-[var(--shadow-card)] hover:scale-105 transition-transform" onClick={submitPublicRequest}>
                  <Send className="h-5 w-5 mr-2" />
                  Submit Request
                </Button>
              </CardContent>
            </Card>

            {/* My Requests */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Clock className="h-6 w-6 text-primary" />
                  <span>My Requests 📋</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {myRequests.map((request, index) => (
                    <div key={request.id} className="p-4 rounded-xl bg-card/70 shadow-[var(--shadow-card)]">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-bold text-lg text-foreground">#{request.id}</div>
                        <Badge className={getStatusColor(request.status) + " rounded-full px-3 py-1 text-base"}>
                          {getStatusIcon(request.status)}
                          <span className="ml-1">{request.status}</span>
                        </Badge>
                      </div>
                      <div className="text-base text-foreground font-bold mb-1">{request.type}</div>
                      <div className="text-sm text-muted-foreground mb-2">{request.description}</div>
                      <div className="text-xs text-muted-foreground">{request.time}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contacts */}
            <Card className="bg-card/80 border-none shadow-[var(--shadow-card)] rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-foreground text-2xl font-bold">
                  <Heart className="h-6 w-6 text-primary" />
                  <span>Emergency Contacts 📞</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button variant="outline" className="w-full justify-start border-destructive text-destructive font-bold rounded-xl hover:bg-destructive/10">
                  <Ambulance className="h-5 w-5 mr-2" />
                  Emergency Services - 108
                </Button>
                <Button variant="outline" className="w-full justify-start border-primary text-primary font-bold rounded-xl hover:bg-primary/10">
                  <Heart className="h-5 w-5 mr-2" />
                  Medical Helpline - 104
                </Button>
                <Button variant="outline" className="w-full justify-start border-destructive text-destructive font-bold rounded-xl hover:bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 mr-2" />
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