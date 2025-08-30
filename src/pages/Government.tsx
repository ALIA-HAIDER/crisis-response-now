import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Shield, 
  Globe, 
  Flag, 
  MapPin, 
  Users, 
  AlertTriangle, 
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronLeft,
  Banknote,
  Package,
  ShieldCheck,
  Wallet,
  Hash,
  Megaphone,
  Bell,
  DollarSign,
  Info,
  Settings2,
  PlusCircle,
  Eye,
  CheckCircle,
  Clock,
  XCircle
} from "lucide-react";
import { isGovernment } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ViewMode = 'international' | 'national' | 'local';

const Government = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialView = (searchParams.get("view") as ViewMode) || (localStorage.getItem("govView") as ViewMode) || 'international';
  const [currentView, setCurrentView] = useState<ViewMode>(initialView);
  const navigate = useNavigate();

  // Redirect if not authenticated as government
  useEffect(() => {
    if (!isGovernment()) {
      navigate("/gov/login", { replace: true });
    }
  }, [navigate]);

  // Keep URL and storage in sync so Local view persists and can be linked
  useEffect(() => {
    setSearchParams({ view: currentView }, { replace: true });
    localStorage.setItem("govView", currentView);
  }, [currentView, setSearchParams]);

  // If the URL changes (back/forward), reflect it in the UI
  useEffect(() => {
    const v = searchParams.get("view") as ViewMode | null;
    if (v && v !== currentView && ['international','national','local'].includes(v)) {
      setCurrentView(v);
    }
  }, [searchParams]);
  
  if (!isGovernment()) return null;

  const internationalData = [
    { country: "Ukraine", starvation: "critical", health: "poor", living: "poor", population: "44M" },
    { country: "Afghanistan", starvation: "critical", health: "critical", living: "critical", population: "39M" },
    { country: "Yemen", starvation: "critical", health: "critical", living: "poor", population: "30M" },
    { country: "Syria", starvation: "moderate", health: "poor", living: "poor", population: "18M" },
  ];

  const nationalData = [
    { state: "Uttar Pradesh", conditions: "moderate", population: "231M", alerts: 12 },
    { state: "Maharashtra", conditions: "stable", population: "123M", alerts: 3 },
    { state: "Bihar", conditions: "poor", population: "128M", alerts: 8 },
    { state: "West Bengal", conditions: "moderate", population: "102M", alerts: 5 },
  ];

  const localData = [
    { area: "Central Mumbai", status: "stable", resources: "adequate", population: "2.1M" },
    { area: "North Delhi", status: "moderate", resources: "limited", population: "1.8M" },
    { area: "East Kolkata", status: "poor", resources: "critical", population: "1.5M" },
    { area: "South Bangalore", status: "stable", resources: "adequate", population: "1.2M" },
  ];

  // Futuristic explorers and aid modal state
  const [cityFilter, setCityFilter] = useState<'all' | 'food' | 'human' | 'health'>('all');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [showAid, setShowAid] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  // Sample city-level data (2070-ready structure)
  const citiesData = [
    { country: "Ukraine", name: "Kyiv",         food: "limited", human: "high",   health: "moderate" },
    { country: "Ukraine", name: "Kharkiv",      food: "poor",    human: "severe", health: "poor" },
    { country: "Afghanistan", name: "Kabul",    food: "poor",    human: "high",   health: "poor" },
    { country: "Afghanistan", name: "Herat",    food: "limited", human: "high",   health: "moderate" },
    { country: "Yemen", name: "Sana'a",         food: "poor",    human: "severe", health: "poor" },
    { country: "Yemen", name: "Aden",           food: "limited", human: "high",   health: "moderate" },
    { country: "Syria", name: "Damascus",       food: "limited", human: "high",   health: "moderate" },
    { country: "Syria", name: "Aleppo",         food: "poor",    human: "severe", health: "poor" },
  ];

  // Aid requests by country -> now stateful so we can append new requests
  const [aidRequestsState, setAidRequestsState] = useState<Record<string, { item: string; qty: string; urgency: 'low'|'medium'|'high'|'severe'; funding?: string }[]>>({
    Ukraine: [
      { item: "Medical Kits", qty: "5,000 units", urgency: "high", funding: "$1.2M" },
      { item: "Power Generators", qty: "120 units", urgency: "medium", funding: "$3.6M" },
      { item: "Emergency Shelter Tents", qty: "1,500", urgency: "high" },
    ],
    Afghanistan: [
      { item: "Food Packs", qty: "50,000", urgency: "severe", funding: "$5.0M" },
      { item: "Water Purification Units", qty: "300", urgency: "high" },
    ],
    Yemen: [
      { item: "Vaccines (Cold Chain)", qty: "80,000 doses", urgency: "high", funding: "$2.1M" },
      { item: "Satellite Comms Kits", qty: "50", urgency: "medium" },
    ],
    Syria: [
      { item: "Field Hospitals", qty: "4", urgency: "high" },
      { item: "Nutritional Supplements", qty: "200,000", urgency: "medium" },
    ],
    // Optional: Add your own country to international pool
    India: [
      { item: "ICU Oxygen Cylinders", qty: "2,000 units", urgency: "high", funding: "$3.0M" },
    ],
  });

  // NEW: self-request form state (for your own country)
  const [myCountry, setMyCountry] = useState<string>("India");
  const [reqType, setReqType] = useState<string>("oxygen");
  const [reqQty, setReqQty] = useState<string>("1000");
  const [reqUnit, setReqUnit] = useState<string>("units");
  const [reqUrgency, setReqUrgency] = useState<'low'|'medium'|'high'|'severe'>("high");
  const [reqFunding, setReqFunding] = useState<string>("");
  const [reqNotes, setReqNotes] = useState<string>("");
  const [deliveryMethod, setDeliveryMethod] = useState<'funds'|'supplies'|'both'>("both");
  const [submitMsg, setSubmitMsg] = useState<string>("");

  // National view additions
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showNoticeModal, setShowNoticeModal] = useState(false);
  const [showFundingModal, setShowFundingModal] = useState(false);
  // New modals
  const [showCitiesModal, setShowCitiesModal] = useState(false);
  const [citiesViewFilter, setCitiesViewFilter] = useState<"all" | "food" | "human" | "health">("all");
  const [showCrisisModal, setShowCrisisModal] = useState(false);

  // Crisis modal state (missing before)
  const [crisisLabel, setCrisisLabel] = useState<"Food Security" | "Humanitarian" | "Health" | "Infrastructure">("Health");
  const [crisisLevel, setCrisisLevel] = useState<"low" | "medium" | "high" | "critical">("high");
  const [causeInput, setCauseInput] = useState("");
  const [needInput, setNeedInput] = useState("");
  const [fundingInput, setFundingInput] = useState<string>("");
  const [conditionsInput, setConditionsInput] = useState<"stable" | "moderate" | "poor">("moderate");
  const [alertsInput, setAlertsInput] = useState<string>("0");

  type Broadcast = { state: string; title: string; message: string; severity: 'low'|'medium'|'high'|'critical'; time: string };
  const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);

  type StateControls = { curfew: boolean; openReliefCamps: boolean; prioritizeMedical: boolean; restrictGatherings: boolean };
  const [controls, setControls] = useState<Record<string, StateControls>>({});
  const [nationalDataState, setNationalDataState] = useState(nationalData);
  const getControls = (st: string): StateControls =>
    controls[st] || { curfew: false, openReliefCamps: true, prioritizeMedical: true, restrictGatherings: false };

  const [noticeTitle, setNoticeTitle] = useState("");
  const [noticeMessage, setNoticeMessage] = useState("");
  const [noticeSeverity, setNoticeSeverity] = useState<'low'|'medium'|'high'|'critical'>("high");

  const [fundAmount, setFundAmount] = useState<string>("");

  const fmtCurrency = (n: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(n);

  // Strong types for dynamic national details
  type StateDetail = {
    causes: string[];
    crises: { label: "Food Security" | "Humanitarian" | "Health" | "Infrastructure"; level: "low" | "medium" | "high" | "critical" }[];
    requiredFundingUSD: number;
    needs: string[];
  };

  const initialNationalDetails: Record<string, StateDetail> = {
    "Uttar Pradesh": {
      causes: ["Monsoon flood displacement", "Dengue outbreak clusters"],
      crises: [
        { label: "Food Security", level: "medium" },
        { label: "Humanitarian", level: "high" },
        { label: "Health", level: "high" }
      ],
      requiredFundingUSD: 12000000,
      needs: ["Dry rations", "Water purification units", "Mobile clinics", "Temporary shelters"]
    },
    "Maharashtra": {
      causes: ["Urban heat waves", "Power grid instability"],
      crises: [
        { label: "Food Security", level: "low" },
        { label: "Humanitarian", level: "medium" },
        { label: "Health", level: "medium" }
      ],
      requiredFundingUSD: 5500000,
      needs: ["Cooling centers", "Backup generators", "Essential medicines"]
    },
    "Bihar": {
      causes: ["River flooding", "Cholera alerts"],
      crises: [
        { label: "Food Security", level: "high" },
        { label: "Humanitarian", level: "high" },
        { label: "Health", level: "critical" }
      ],
      requiredFundingUSD: 18000000,
      needs: ["High-protein food kits", "Vaccines & ORS", "Boats & rescue gear", "Field hospitals"]
    },
    "West Bengal": {
      causes: ["Cyclone damage", "Supply chain disruption"],
      crises: [
        { label: "Food Security", level: "medium" },
        { label: "Humanitarian", level: "medium" },
        { label: "Health", level: "medium" }
      ],
      requiredFundingUSD: 8000000,
      needs: ["Roofing materials", "Tents", "Antibiotics", "Water tanks"]
    }
  };
  const [nationalDetailsState, setNationalDetailsState] = useState<Record<string, StateDetail>>(initialNationalDetails);

  // Per-state cities depth (priority by food/human/health)
  const [stateCities] = useState<Record<string, { name: string; food: string; human: string; health: string }[]>>({
    "Uttar Pradesh": [
      { name: "Lucknow", food: "moderate", human: "high", health: "high" },
      { name: "Varanasi", food: "limited", human: "medium", health: "high" },
      { name: "Kanpur", food: "limited", human: "high", health: "moderate" },
    ],
    "Maharashtra": [
      { name: "Mumbai", food: "low", human: "medium", health: "medium" },
      { name: "Pune", food: "low", human: "low", health: "medium" },
      { name: "Nagpur", food: "limited", human: "medium", health: "medium" },
    ],
    "Bihar": [
      { name: "Patna", food: "high", human: "high", health: "critical" },
      { name: "Gaya", food: "high", human: "medium", health: "high" },
      { name: "Bhagalpur", food: "moderate", human: "high", health: "high" },
    ],
    "West Bengal": [
      { name: "Kolkata", food: "moderate", human: "medium", health: "medium" },
      { name: "Howrah", food: "limited", human: "medium", health: "medium" },
      { name: "Durgapur", food: "limited", human: "low", health: "medium" },
    ],
  });

  // Helpers for severity scoring and top city
  const levelScore = (lvl: string) => {
    switch (lvl) {
      case "critical": return 4;
      case "severe":
      case "high": return 3;
      case "poor":
      case "moderate":
      case "limited": return 2;
      case "low":
      case "stable":
      case "adequate": return 1;
      default: return 0;
    }
  };
  const topCityForState = (st: string) => {
    const list = stateCities[st] || [];
    const score = (c: { food: string; human: string; health: string }) =>
      levelScore(c.human) + levelScore(c.health) + levelScore(c.food);
    return list.slice().sort((a, b) => score(b) - score(a))[0];
  };

  const getInternationalStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-destructive text-destructive-foreground';
      case 'poor': return 'bg-warning text-warning-foreground';
      case 'moderate': return 'bg-moderate text-foreground';
      case 'stable': return 'bg-success text-success-foreground';
      case 'adequate': return 'bg-success text-success-foreground';
      case 'limited': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getInternationalStatusIcon = (status: string) => {
    switch (status) {
      case 'critical':
      case 'poor':
        return <TrendingDown className="h-4 w-4" />;
      case 'moderate':
        return <Minus className="h-4 w-4" />;
      case 'stable':
      case 'adequate':
        return <TrendingUp className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  // Badge helper for city-level metrics
  const levelBadge = (lvl: string) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border";
    if (["good","stable","adequate"].includes(lvl)) return `${base} bg-success/10 text-success border-success/20`;
    if (["limited","moderate"].includes(lvl)) return `${base} bg-warning/10 text-warning border-warning/20`;
    if (["high","poor"].includes(lvl)) return `${base} bg-destructive/10 text-destructive border-destructive/20`;
    if (["severe","critical"].includes(lvl)) return `${base} bg-destructive/10 text-destructive border-destructive/30`;
    return `${base} bg-muted text-muted-foreground border-border`;
  };

  // Simulated blockchain transfer
  const transfer = async (country: string, type: 'funds' | 'supplies') => {
    setIsTransferring(true);
    setTxHash(null);
    await new Promise(r => setTimeout(r, 1200));
    const hash = `0x${Math.random().toString(16).slice(2, 10)}${Date.now().toString(16)}`;
    setTxHash(hash);
    setIsTransferring(false);
  };

  // NEW: submit handler for own-country requests
  const handleSubmitOwnRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    const labelMap: Record<string, string> = {
      oxygen: "Medical Oxygen Cylinders",
      medicine: "Medicinal Supplies",
      shelter: "Emergency Shelter Tents",
      food: "Food Packs",
      water: "Water Purification Units",
      power: "Power Generators",
      comms: "Satellite Communication Kits",
    };
    const item = labelMap[reqType] || "Relief Supplies";
    const qty = `${reqQty} ${reqUnit}`.trim();
    const funding = reqFunding ? `$${reqFunding}` : undefined;

    setAidRequestsState(prev => ({
      ...prev,
      [myCountry]: [...(prev[myCountry] || []), { item, qty, urgency: reqUrgency, funding }]
    }));

    setSelectedCountry(myCountry);
    setShowAid(true);
    setSubmitMsg("Request created. Preparing secure transfer...");

    // Optional automatic transfer based on method
    if (deliveryMethod === "funds" || deliveryMethod === "both") {
      await transfer(myCountry, "funds");
    }
    if (deliveryMethod === "supplies" || deliveryMethod === "both") {
      await transfer(myCountry, "supplies");
    }
    setSubmitMsg("Request submitted and recorded on the ledger (simulated).");
  };

  // Toggle or clear country focus
  const toggleFocus = (country?: string) => {
    setSelectedCountry(prev => (prev === country || !country ? null : country));
  };

  // Broadcast submit
  const handleBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState) return;
    setBroadcasts(prev => [
      { state: selectedState, title: noticeTitle || "Emergency Notice", message: noticeMessage, severity: noticeSeverity, time: new Date().toLocaleString() },
      ...prev,
    ]);
    // Reset and close
    setNoticeTitle("");
    setNoticeMessage("");
    setNoticeSeverity("high");
    setShowNoticeModal(false);
  };

  // Save control toggles
  const setControl = (st: string, patch: Partial<StateControls>) => {
    setControls(prev => ({ ...prev, [st]: { ...getControls(st), ...patch } }));
  };

  // Local public requests (mock data for demo)
  type ReqType = "medical" | "food" | "water" | "shelter" | "power" | "ambulance";
  type Urgency = "low" | "medium" | "high" | "critical";
  type ReqStatus = "pending" | "approved" | "rejected";
  const [localPublicRequests, setLocalPublicRequests] = useState<Array<{
    id: string;
    requester: string;
    reqType: ReqType;
    urgency: Urgency;
    status: ReqStatus;
    location: string;
    description: string;
    submittedAt: number;
  }>>([
    { id: "LPR-201", requester: "Priya", reqType: "medical", urgency: "high", status: "pending", location: "Central Mumbai", description: "Urgent oxygen for elderly", submittedAt: Date.now() - 1000 * 60 * 20 },
    { id: "LPR-202", requester: "Ravi", reqType: "food", urgency: "medium", status: "pending", location: "North Delhi", description: "Food kits for 5 families", submittedAt: Date.now() - 1000 * 60 * 90 },
    { id: "LPR-203", requester: "Sara", reqType: "ambulance", urgency: "critical", status: "pending", location: "East Kolkata", description: "Ambulance needed for accident", submittedAt: Date.now() - 1000 * 60 * 10 },
    { id: "LPR-204", requester: "Amit", reqType: "water", urgency: "high", status: "approved", location: "South Bangalore", description: "Clean water shortage", submittedAt: Date.now() - 1000 * 60 * 60 },
  ]);
  const [govSelected, setGovSelected] = useState<string | null>(null);
  const [localActionMsg, setLocalActionMsg] = useState<string>("");

  // Helpers for local modal
  const urgencyBadge = (u: Urgency) => {
    const base = "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border";
    if (u === "critical") return `${base} bg-destructive/10 text-destructive border-destructive/30`;
    if (u === "high") return `${base} bg-destructive/10 text-destructive border-destructive/20`;
    if (u === "medium") return `${base} bg-warning/10 text-warning border-warning/20`;
    return `${base} bg-success/10 text-success border-success/20`;
  };
  const getStatusColor = (status: string) => {
    switch (status) {
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
  const formatAgo = (ts: number) => {
    const mins = Math.max(1, Math.floor((Date.now() - ts) / 60000));
    return mins < 60 ? `${mins}m ago` : `${Math.floor(mins / 60)}h ago`;
  };
  const typeIcon = (t: ReqType) =>
    t === "medical" ? Shield :
    t === "food" ? Minus :
    t === "water" ? AlertTriangle :
    t === "shelter" ? Package :
    t === "power" ? Banknote :
    Activity;

  const updateStatus = (id: string, status: ReqStatus) =>
    setLocalPublicRequests(prev => prev.map(r => r.id === id ? { ...r, status } : r));

  // Simulate ambulance allotment
  const allotAmbulance = (id: string) => {
    setLocalActionMsg("Ambulance allotted and dispatched (simulated).");
    setTimeout(() => setLocalActionMsg(""), 2000);
    updateStatus(id, "approved");
  };

  // Simulate fund/supply dispatch
  const dispatchFunds = (id: string) => {
    setLocalActionMsg("Funds transferred (simulated).");
    setTimeout(() => setLocalActionMsg(""), 2000);
    updateStatus(id, "approved");
  };
  const dispatchSupplies = (id: string) => {
    setLocalActionMsg("Supplies dispatched (simulated).");
    setTimeout(() => setLocalActionMsg(""), 2000);
    updateStatus(id, "approved");
  };

  // Helper to detect if request asks for funds/supplies
  const needsFunds = (r: { reqType: string; description: string }) =>
    /fund|money|finance|payment|cash|transfer/i.test(r.description) ||
    r.reqType === "power";
  const needsSupplies = (r: { reqType: string; description: string }) =>
    /supply|kit|food|water|medicine|shelter|ambulance|oxygen|resource|dispatch/i.test(r.description) ||
    ["medical", "food", "water", "shelter", "ambulance"].includes(r.reqType);

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
                <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Government Portal</h1>
                  <p className="text-sm text-muted-foreground">Crisis Monitoring Dashboard</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">Live Monitoring</span>
            </div>
          </div>
        </div>
      </header>

      {/* View Selection */}
      <section className="py-6 border-b bg-card/50">
        <div className="container mx-auto px-6">
          <div className="flex space-x-4">
            <Button
              variant={currentView === 'international' ? 'default' : 'outline'}
              onClick={() => setCurrentView('international')}
              className="flex items-center space-x-2"
            >
              <Globe className="h-4 w-4" />
              <span>International</span>
            </Button>
            <Button
              variant={currentView === 'national' ? 'default' : 'outline'}
              onClick={() => setCurrentView('national')}
              className="flex items-center space-x-2"
            >
              <Flag className="h-4 w-4" />
              <span>National</span>
            </Button>
            <Button
              variant={currentView === 'local' ? 'default' : 'outline'}
              onClick={() => setCurrentView('local')}
              className="flex items-center space-x-2"
            >
              <MapPin className="h-4 w-4" />
              <span>Local</span>
            </Button>
          </div>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          {/* Summary Stats */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Population</p>
                    <p className="text-2xl font-bold text-foreground">
                      {currentView === 'international' ? '131M' : 
                       currentView === 'national' ? '584M' : '6.6M'}
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Active Alerts</p>
                    <p className="text-2xl font-bold text-destructive">
                      {currentView === 'international' ? '47' : 
                       currentView === 'national' ? '28' : '12'}
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-destructive" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Critical Areas</p>
                    <p className="text-2xl font-bold text-warning">
                      {currentView === 'international' ? '8' : 
                       currentView === 'national' ? '3' : '1'}
                    </p>
                  </div>
                  <Activity className="h-8 w-8 text-warning" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Stable Regions</p>
                    <p className="text-2xl font-bold text-success">
                      {currentView === 'international' ? '156' : 
                       currentView === 'national' ? '25' : '8'}
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-success" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Data Tables */}
          {currentView === 'international' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>International Crisis Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {internationalData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="font-semibold text-foreground min-w-[120px]">{item.country}</div>
                        <div className="text-sm text-muted-foreground">{item.population}</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Starvation:</span>
                          <Badge className={getInternationalStatusColor(item.starvation)}>
                            {getInternationalStatusIcon(item.starvation)}
                            <span className="ml-1">{item.starvation}</span>
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Health:</span>
                          <Badge className={getInternationalStatusColor(item.health)}>
                            {getInternationalStatusIcon(item.health)}
                            <span className="ml-1">{item.health}</span>
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Living:</span>
                          <Badge className={getInternationalStatusColor(item.living)}>
                            {getInternationalStatusIcon(item.living)}
                            <span className="ml-1">{item.living}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentView === 'national' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center space-x-2">
                    <Flag className="h-5 w-5" />
                    <span>National State Overview - India</span>
                  </span>
                  <span className="text-xs text-muted-foreground">Deep insights • Funding • Broadcasts</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nationalDataState.map((item, index) => {
                    const info = nationalDetailsState[item.state];
                    const top = topCityForState(item.state);
                    return (
                      <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="min-w-[200px]">
                              <div className="font-semibold text-foreground">{item.state}</div>
                              <div className="text-xs text-muted-foreground">{item.population}</div>
                            </div>
                            <div className="hidden md:flex items-center gap-3">
                              <div className="text-sm">
                                <span className="text-muted-foreground mr-2">Conditions:</span>
                                <Badge className={getStatusColor(item.conditions)}>
                                  {getStatusIcon(item.conditions)}
                                  <span className="ml-1">{item.conditions}</span>
                                </Badge>
                              </div>
                              <div className="text-sm">
                                <span className="text-muted-foreground mr-2">Alerts:</span>
                                <Badge variant="outline" className="border-destructive text-destructive">
                                  {item.alerts}
                                </Badge>
                              </div>
                              {info && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground mr-2">Funding Need:</span>
                                  <Badge variant="outline" className="border-primary/40 text-primary">
                                    <DollarSign className="h-3 w-3 mr-1" />
                                    {fmtCurrency(info.requiredFundingUSD)}
                                  </Badge>
                                </div>
                              )}
                              {info && (
                                <div className="text-sm">
                                  <span className="text-muted-foreground mr-2">Top City:</span>
                                  {top ? (
                                    <Badge variant="outline" className="border-secondary/40">{top.name}</Badge>
                                  ) : (
                                    <Badge variant="outline" className="border-muted text-muted-foreground">N/A</Badge>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              className="border-primary/30"
                              onClick={() => { setSelectedState(item.state); setShowStateModal(true); }}
                            >
                              <Info className="h-4 w-4 mr-1" /> Details
                            </Button>
                            <Button
                              variant="outline"
                              className="border-warning/30 text-warning"
                              onClick={() => { setSelectedState(item.state); setShowNoticeModal(true); }}
                            >
                              <Megaphone className="h-4 w-4 mr-1" /> Notice
                            </Button>
                            <Button
                              className="bg-gradient-primary"
                              onClick={() => { 
                                setSelectedState(item.state); 
                                setFundAmount(info ? String(info.requiredFundingUSD) : "0"); 
                                setShowFundingModal(true); 
                              }}
                            >
                              <Banknote className="h-4 w-4 mr-1" /> Fund
                            </Button>
                            <Button
                              variant="outline"
                              className="border-secondary/30"
                              onClick={() => { setSelectedState(item.state); setCitiesViewFilter("all"); setShowCitiesModal(true); }}
                            >
                              <MapPin className="h-4 w-4 mr-1" /> Cities
                            </Button>
                            <Button
                              variant="outline"
                              className="border-primary/30"
                              onClick={() => { 
                                setSelectedState(item.state);
                                setConditionsInput(item.conditions as any);
                                setAlertsInput(String(item.alerts));
                                setCrisisLabel("Health");
                                setCrisisLevel("high");
                                setCauseInput("");
                                setNeedInput("");
                                setFundingInput(info ? String(info.requiredFundingUSD) : "");
                                setShowCrisisModal(true);
                              }}
                            >
                              <PlusCircle className="h-4 w-4 mr-1" /> Raise/Update
                            </Button>
                          </div>
                        </div>
                        {info && (
                          <div className="mt-3 grid md:grid-cols-3 gap-3 text-xs">
                            <div className="p-3 rounded-md border bg-background/80">
                              <div className="font-medium mb-1">Crises</div>
                              <div className="flex flex-wrap gap-2">
                                {info.crises.map((c, i) => (
                                  <span key={i} className={levelBadge(c.level)}>{c.label}: {c.level}</span>
                                ))}
                              </div>
                            </div>
                            <div className="p-3 rounded-md border bg-background/80">
                              <div className="font-medium mb-1">Causes</div>
                              <ul className="list-disc ml-4 space-y-1 text-muted-foreground">
                                {info.causes.map((c, i) => (<li key={i}>{c}</li>))}
                              </ul>
                            </div>
                            <div className="p-3 rounded-md border bg-background/80">
                              <div className="font-medium mb-1">Needs</div>
                              <ul className="list-disc ml-4 space-y-1 text-muted-foreground">
                                {info.needs.map((n, i) => (<li key={i}>{n}</li>))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Broadcasts & Ops */}
                <div className="mt-6 grid lg:grid-cols-2 gap-4">
                  <Card className="border-primary/20">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" /> Broadcasts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3 max-h-72 overflow-auto">
                        {broadcasts.length === 0 && (
                          <div className="text-sm text-muted-foreground">No broadcasts yet.</div>
                        )}
                        {broadcasts.map((b, i) => (
                          <div key={i} className="p-3 border rounded-md">
                            <div className="flex items-center justify-between">
                              <div className="font-medium text-foreground">{b.title}</div>
                              <span className="text-xs text-muted-foreground">{b.time}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">State: <span className="text-foreground">{b.state}</span></div>
                            <div className="text-sm mt-1">{b.message}</div>
                            <div className="mt-2">
                              <span className={levelBadge(b.severity)}>{b.severity}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-secondary/40">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Settings2 className="h-5 w-5" /> State Controls
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {selectedState ? (
                        <div className="space-y-2">
                          <div className="text-sm text-muted-foreground">Managing: <span className="text-foreground font-medium">{selectedState}</span></div>
                          {(() => {
                            const c = getControls(selectedState);
                            return (
                              <div className="grid grid-cols-2 gap-2">
                                <Button variant={c.curfew ? "default" : "outline"} onClick={() => setControl(selectedState, { curfew: !c.curfew })}>
                                  {c.curfew ? "Curfew: On" : "Curfew: Off"}
                                </Button>
                                <Button variant={c.openReliefCamps ? "default" : "outline"} onClick={() => setControl(selectedState, { openReliefCamps: !c.openReliefCamps })}>
                                  {c.openReliefCamps ? "Relief Camps: Open" : "Relief Camps: Closed"}
                                </Button>
                                <Button variant={c.prioritizeMedical ? "default" : "outline"} onClick={() => setControl(selectedState, { prioritizeMedical: !c.prioritizeMedical })}>
                                  {c.prioritizeMedical ? "Medical: Priority" : "Medical: Normal"}
                                </Button>
                                <Button variant={c.restrictGatherings ? "default" : "outline"} onClick={() => setControl(selectedState, { restrictGatherings: !c.restrictGatherings })}>
                                  {c.restrictGatherings ? "Gatherings: Restricted" : "Gatherings: Allowed"}
                                </Button>
                              </div>
                            );
                          })()}
                          <div className="text-xs text-muted-foreground mt-2">Controls affect guidance shown to users in the state (prototype).</div>
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">Select a state to manage controls.</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

          {currentView === 'local' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Local Area Overview - Major Cities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {localData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="font-semibold text-foreground min-w-[150px]">{item.area}</div>
                        <div className="text-sm text-muted-foreground">{item.population}</div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Status:</span>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1">{item.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Resources:</span>
                          <Badge className={getStatusColor(item.resources)}>
                            {getStatusIcon(item.resources)}
                            <span className="ml-1">{item.resources}</span>
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {/* Local Public Requests (Gov only) */}
                {isGovernment() && (
                  <div className="mt-8">
                    <div className="font-semibold mb-2 text-foreground">Public Requests (Local)</div>
                    <div className="space-y-3">
                      {localPublicRequests.map(r => {
                        const Icon = typeIcon(r.reqType);
                        return (
                          <div key={r.id} className="p-3 border rounded-lg flex items-center justify-between hover:bg-muted/50">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-md bg-muted">
                                <Icon className="h-4 w-4 text-primary" />
                              </div>
                              <div>
                                <div className="text-sm font-medium text-foreground">
                                  {r.requester} • <span className="capitalize">{r.reqType}</span>
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {r.location} • {formatAgo(r.submittedAt)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={urgencyBadge(r.urgency)}>{r.urgency}</span>
                              <Badge className={getStatusColor(r.status)}>
                                {getStatusIcon(r.status)}
                                <span className="ml-1 capitalize">{r.status}</span>
                              </Badge>
                              <Button size="sm" variant="outline" onClick={() => setGovSelected(r.id)}>
                                <Eye className="h-4 w-4 mr-1" /> View
                              </Button>
                              {r.reqType === "ambulance" && r.status === "pending" && (
                                <Button size="sm" className="bg-gradient-primary" onClick={() => allotAmbulance(r.id)}>
                                  Allot Ambulance
                                </Button>
                              )}
                              <Button size="sm" className="bg-gradient-success" onClick={() => updateStatus(r.id, "approved")}>
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="border-destructive text-destructive" onClick={() => updateStatus(r.id, "rejected")}>
                                Reject
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      {localPublicRequests.length === 0 && (
                        <div className="text-sm text-muted-foreground">No local requests.</div>
                      )}
                      {localActionMsg && (
                        <div className="text-xs text-success mt-2">{localActionMsg}</div>
                      )}
                    </div>
                    {/* Modal for viewing details and dispatch actions */}
                    {govSelected && (() => {
                      const r = localPublicRequests.find(x => x.id === govSelected);
                      if (!r) return null;
                      const Icon = typeIcon(r.reqType);
                      // Helper to detect if request asks for funds/supplies
                      const needsFunds = /fund|money|finance|payment|cash|transfer/i.test(r.description) || r.reqType === "power";
                      const needsSupplies = /supply|kit|food|water|medicine|shelter|ambulance|oxygen|resource|dispatch/i.test(r.description) ||
                        ["medical", "food", "water", "shelter", "ambulance"].includes(r.reqType);
                      return (
                        <div className="fixed inset-0 z-50 flex items-center justify-center">
                          <div className="absolute inset-0 bg-black/50" onClick={() => setGovSelected(null)} />
                          <div className="relative z-10 w-full max-w-xl">
                            <Card className="bg-card/80 backdrop-blur border-primary/20">
                              <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                  <span>Request Details</span>
                                  <Button variant="outline" size="sm" onClick={() => setGovSelected(null)}>Close</Button>
                                </CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-3 text-sm">
                                  <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-md bg-muted">
                                      <Icon className="h-4 w-4 text-primary" />
                                    </div>
                                    <div className="font-medium text-foreground">
                                      {r.requester} • <span className="capitalize">{r.reqType}</span>
                                    </div>
                                  </div>
                                  <div className="text-muted-foreground">Submitted: {formatAgo(r.submittedAt)}</div>
                                  <div><span className="text-muted-foreground">Location:</span> {r.location}</div>
                                  <div><span className="text-muted-foreground">Urgency:</span> <span className={urgencyBadge(r.urgency)}>{r.urgency}</span></div>
                                  <div><span className="text-muted-foreground">Status:</span> <Badge className={getStatusColor(r.status)}><span className="capitalize">{r.status}</span></Badge></div>
                                  <div>
                                    <div className="text-muted-foreground mb-1">Description</div>
                                    <div className="p-3 rounded-md border bg-background/70">{r.description}</div>
                                  </div>
                                  <div className="flex gap-2 pt-2 flex-wrap">
                                    {r.reqType === "ambulance" && r.status === "pending" && (
                                      <Button className="bg-gradient-primary" onClick={() => { allotAmbulance(r.id); setGovSelected(null); }}>
                                        Allot Ambulance
                                      </Button>
                                    )}
                                    <Button className="bg-gradient-success" onClick={() => { updateStatus(r.id, "approved"); setGovSelected(null); }}>Approve</Button>
                                    <Button variant="outline" className="border-destructive text-destructive" onClick={() => { updateStatus(r.id, "rejected"); setGovSelected(null); }}>Reject</Button>
                                    {needsFunds && (
                                      <Button variant="outline" className="border-primary" onClick={() => { dispatchFunds(r.id); setGovSelected(null); }}>
                                        Send Funds
                                      </Button>
                                    )}
                                    {needsSupplies && (
                                      <Button variant="outline" className="border-success" onClick={() => { dispatchSupplies(r.id); setGovSelected(null); }}>
                                        Dispatch Supplies
                                      </Button>
                                    )}
                                  </div>
                                  {localActionMsg && (
                                    <div className="text-xs text-success mt-2">{localActionMsg}</div>
                                  )}
                                </div>
                              </CardContent>
                            </Card>
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* International */}
          {currentView === 'international' && (
            <>
              {/* Countries overview (existing block) */}
              {/* ...existing code (International Crisis Overview card)... */}

              {/* NEW: Raise Aid Request (Own Country) */}
              <Card className="mt-6 border-primary/20 bg-card/70 backdrop-blur">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span>Raise Aid Request (Your Country)</span>
                    </span>
                    <Badge variant="outline" className="border-primary/30 text-primary">Encrypted • 2070 Ready</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitOwnRequest} className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Country</label>
                        <select value={myCountry} onChange={(e) => setMyCountry(e.target.value)} className="w-full p-2 rounded-md border bg-background">
                          {["India","Ukraine","Afghanistan","Yemen","Syria"].map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Request Type</label>
                        <select value={reqType} onChange={(e) => setReqType(e.target.value)} className="w-full p-2 rounded-md border bg-background">
                          <option value="oxygen">Oxygen</option>
                          <option value="medicine">Medicine</option>
                          <option value="shelter">Shelter</option>
                          <option value="food">Food</option>
                          <option value="water">Water</option>
                          <option value="power">Power</option>
                          <option value="comms">Communications</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Urgency</label>
                        <select value={reqUrgency} onChange={(e) => setReqUrgency(e.target.value as any)} className="w-full p-2 rounded-md border bg-background">
                          <option value="low">Low</option>
                          <option value="medium">Medium</option>
                          <option value="high">High</option>
                          <option value="severe">Severe</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Quantity</label>
                        <Input type="number" min="1" value={reqQty} onChange={(e) => setReqQty(e.target.value)} placeholder="e.g., 1000" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Unit</label>
                        <Input value={reqUnit} onChange={(e) => setReqUnit(e.target.value)} placeholder="units / tons / doses" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground block mb-1">Requested Funding (USD)</label>
                        <Input type="number" min="0" value={reqFunding} onChange={(e) => setReqFunding(e.target.value)} placeholder="Optional" />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Operational Notes</label>
                      <Textarea rows={3} value={reqNotes} onChange={(e) => setReqNotes(e.target.value)} placeholder="Logistics, priority regions, special handling..." />
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <label className="text-sm font-medium text-foreground block mb-1">Delivery Method</label>
                        <div className="flex gap-2">
                          {(["both","funds","supplies"] as const).map(m => (
                            <Button
                              key={m}
                              type="button"
                              variant={deliveryMethod === m ? "default" : "outline"}
                              className={deliveryMethod === m ? "" : "border-primary/30"}
                              onClick={() => setDeliveryMethod(m)}
                              size="sm"
                            >
                              {m === "both" ? "Funds + Supplies" : m === "funds" ? "Funds" : "Supplies"}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-end">
                        <Button type="submit" className="w-full bg-gradient-primary">
                          Submit (Blockchain-secured)
                        </Button>
                      </div>
                    </div>

                    {submitMsg && (
                      <div className="text-xs text-muted-foreground">{submitMsg}</div>
                    )}
                  </form>

                  {/* Helper: how government will help */}
                  <div className="mt-6 p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="text-sm font-medium text-foreground mb-2">How assistance is executed</div>
                    <div className="grid sm:grid-cols-3 gap-3 text-xs">
                      <div className="p-3 rounded-md border bg-background/80">
                        <div className="font-medium mb-1">Medical/Oxygen</div>
                        <p className="text-muted-foreground">Dispatch cylinders, ventilators, ICU beds; allocate emergency funding to hospitals.</p>
                      </div>
                      <div className="p-3 rounded-md border bg-background/80">
                        <div className="font-medium mb-1">Medicinal Supplies</div>
                        <p className="text-muted-foreground">Bulk procure medicines; auto-replenish pharmacies; cold-chain logistics for vaccines.</p>
                      </div>
                      <div className="p-3 rounded-md border bg-background/80">
                        <div className="font-medium mb-1">Shelter & Essentials</div>
                        <p className="text-muted-foreground">Deploy tents, food/water units, and power generators to priority zones.</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Futuristic Global Cities Explorer */}
              <Card className="mt-6 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Global Cities Overview</span>
                    </span>
                    <div className="flex items-center gap-2">
                      {/* New: All Countries button to clear focus */}
                      <Button
                        variant={selectedCountry ? "outline" : "default"}
                        size="sm"
                        onClick={() => toggleFocus()}
                        className={selectedCountry ? "border-primary/30" : ""}
                      >
                        All Countries
                      </Button>
                      {(["all","food","human","health"] as const).map(f => (
                        <Button
                          key={f}
                          variant={cityFilter === f ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCityFilter(f)}
                          className={cityFilter === f ? "" : "border-primary/30"}
                        >
                          {f === "all" ? "All" : f === "food" ? "Food Quality" : f === "human" ? "Human Crisis" : "Health Crisis"}
                        </Button>
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {citiesData
                      .filter(c => !selectedCountry || c.country === selectedCountry)
                      .sort((a, b) => {
                        // simple priority sort based on selected filter
                        const order = (v: string) =>
                          v === "severe" ? 4 : v === "high" || v === "poor" ? 3 : v === "limited" || v === "moderate" ? 2 : 1;
                        if (cityFilter === "food") return order(b.food) - order(a.food);
                        if (cityFilter === "human") return order(b.human) - order(a.human);
                        if (cityFilter === "health") return order(b.health) - order(a.health);
                        // default heuristic
                        return (order(b.human) + order(b.health)) - (order(a.human) + order(a.health));
                      })
                      .map((city, i) => (
                        <div key={`${city.country}-${city.name}-${i}`} className="p-4 border rounded-lg hover:shadow-card transition-all bg-card/60 backdrop-blur">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-semibold text-foreground">{city.name}</div>
                            <Badge variant="outline" className="border-primary/30 text-primary">{city.country}</Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="space-y-1">
                              <div><span className="text-muted-foreground">Food:</span> <span className={levelBadge(city.food)}>{city.food}</span></div>
                              <div><span className="text-muted-foreground">Human:</span> <span className={levelBadge(city.human)}>{city.human}</span></div>
                              <div><span className="text-muted-foreground">Health:</span> <span className={levelBadge(city.health)}>{city.health}</span></div>
                            </div>
                            <div className="flex flex-col gap-2">
                              {/* Toggle focus/unfocus */}
                              <Button
                                size="sm"
                                variant="outline"
                                className="border-primary/30"
                                onClick={() => toggleFocus(city.country)}
                              >
                                {selectedCountry === city.country ? "Unfocus" : "Focus Country"}
                              </Button>
                              <Button
                                size="sm"
                                className="bg-gradient-primary"
                                onClick={() => { setSelectedCountry(city.country); setShowAid(true); }}
                              >
                                Aid Requests
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                  {selectedCountry && (
                    <div className="text-xs text-muted-foreground mt-3 flex items-center">
                      <span>
                        Focused on: <span className="font-medium text-foreground">{selectedCountry}</span>
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 px-2 ml-2"
                        onClick={() => toggleFocus()}
                      >
                        Clear
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Countries list actions upgrade */}
              <div className="mt-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4">
                  {["Ukraine","Afghanistan","Yemen","Syria"].map((c) => (
                    <Card key={c} className="border-primary/10">
                      <CardContent className="p-4 flex items-center justify-between">
                        <div className="space-y-1">
                          <div className="text-lg font-semibold">{c}</div>
                          <div className="text-xs text-muted-foreground">National showcase and requests</div>
                        </div>
                        <div className="flex gap-2">
                          {/* Toggle focus/unfocus for country list */}
                          <Button
                            variant="outline"
                            className="border-primary/30"
                            onClick={() => toggleFocus(c)}
                          >
                            {selectedCountry === c ? "Unfocus" : "View Cities"}
                          </Button>
                          <Button className="bg-gradient-primary" onClick={() => { setSelectedCountry(c); setShowAid(true); }}>
                            Aid Requests
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* National and Local */}
          {/* ...existing code (national and local cards)... */}
        </div>
      </section>

      {/* State Details Modal */}
      {showStateModal && selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowStateModal(false)} />
          <div className="relative z-10 w-full max-w-2xl">
            <Card className="bg-card/80 backdrop-blur border-primary/20 shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Info className="h-5 w-5 text-primary" />
                    <span>{selectedState} — Details</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setShowStateModal(false)}>Close</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {(() => {
                  const info = nationalDetailsState[selectedState];
                  return info ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-3 gap-3 text-sm">
                        <div className="p-3 rounded-md border bg-background/80">
                          <div className="font-medium mb-1">Crises</div>
                          <div className="flex flex-wrap gap-2">
                            {info.crises.map((c, i) => (<span key={i} className={levelBadge(c.level)}>{c.label}: {c.level}</span>))}
                          </div>
                        </div>
                        <div className="p-3 rounded-md border bg-background/80">
                          <div className="font-medium mb-1">Causes</div>
                          <ul className="list-disc ml-4 space-y-1 text-muted-foreground">
                            {info.causes.map((c, i) => (<li key={i}>{c}</li>))}
                          </ul>
                        </div>
                        <div className="p-3 rounded-md border bg-background/80">
                          <div className="font-medium mb-1">Funding Required</div>
                          <div className="text-foreground">{fmtCurrency(info.requiredFundingUSD)}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" className="border-success/30 text-success hover:bg-success hover:text-success-foreground"
                          onClick={() => transfer(selectedState, 'supplies')}>
                          <Package className="h-4 w-4 mr-1" /> Dispatch Supplies
                        </Button>
                        <Button className="bg-gradient-primary" onClick={() => { setFundAmount(String(info.requiredFundingUSD)); setShowFundingModal(true); }}>
                          <Banknote className="h-4 w-4 mr-1" /> Transfer Funds
                        </Button>
                        <Button variant="outline" className="border-warning/30 text-warning" onClick={() => { setShowStateModal(false); setShowNoticeModal(true); }}>
                          <Megaphone className="h-4 w-4 mr-1" /> Send Notice
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">No details available.</div>
                  );
                })()}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Emergency Notice Modal */}
      {showNoticeModal && selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowNoticeModal(false)} />
          <div className="relative z-10 w-full max-w-xl">
            <Card className="bg-card/80 backdrop-blur border-warning/30 shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-warning" />
                    <span>Emergency Notice — {selectedState}</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setShowNoticeModal(false)}>Close</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleBroadcast} className="space-y-3">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Title</label>
                      <Input value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} placeholder="e.g., Flood Warning Level 3" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Severity</label>
                      <select value={noticeSeverity} onChange={(e) => setNoticeSeverity(e.target.value as any)} className="w-full p-2 rounded-md border bg-background">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Message</label>
                    <Textarea rows={4} value={noticeMessage} onChange={(e) => setNoticeMessage(e.target.value)} placeholder="Guidelines, safe shelters, helpline numbers, etc." />
                  </div>
                  <Button type="submit" className="bg-gradient-emergency w-full">
                    <Bell className="h-4 w-4 mr-1" /> Broadcast to users (prototype)
                  </Button>
                  <div className="text-xs text-muted-foreground">Citizens of {selectedState} will receive this alert in their app (demo).</div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Funding Modal */}
      {showFundingModal && selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowFundingModal(false); setTxHash(null); }} />
          <div className="relative z-10 w-full max-w-lg">
            <Card className="bg-card/80 backdrop-blur border-primary/20 shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <Banknote className="h-5 w-5 text-primary" />
                    <span>Approve Funding — {selectedState}</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => { setShowFundingModal(false); setTxHash(null); }}>Close</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Amount (USD)</label>
                    <Input type="number" min="0" value={fundAmount} onChange={(e) => setFundAmount(e.target.value)} />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1">Memo</label>
                    <Input placeholder="Relief Ops FY2070-Q2" />
                  </div>
                </div>
                <div className="mt-3 flex gap-2">
                  <Button className="bg-gradient-primary" onClick={() => transfer(selectedState, 'funds')}>
                    <Banknote className="h-4 w-4 mr-1" /> Transfer Now
                  </Button>
                  <Button variant="outline" className="border-success/30 text-success hover:bg-success hover:text-success-foreground" onClick={() => transfer(selectedState, 'supplies')}>
                    <Package className="h-4 w-4 mr-1" /> Dispatch Supplies
                  </Button>
                </div>
                <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 text-sm">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">Blockchain-secured transfer</span>
                    <span className="text-muted-foreground"> (simulated)</span>
                  </div>
                  {isTransferring && (
                    <div className="mt-2 text-xs text-muted-foreground">Submitting transaction...</div>
                  )}
                  {txHash && (
                    <div className="mt-2 text-xs">
                      <span className="inline-flex items-center gap-1 text-foreground">
                        <Hash className="h-3 w-3" /> Tx Hash:
                      </span>{" "}
                      <span className="font-mono">{txHash}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Aid Requests Modal */}
      {showAid && selectedCountry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => { setShowAid(false); setTxHash(null); }} />
          <div className="relative z-10 w-full max-w-2xl">
            <Card className="bg-card/80 backdrop-blur border-primary/20 shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                    <span>{selectedCountry} — Aid Requests</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => { setShowAid(false); setTxHash(null); }}>
                    Close
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(aidRequestsState[selectedCountry] || []).map((req, idx) => (
                    <div key={idx} className="p-3 border rounded-lg flex items-center justify-between">
                      <div>
                        <div className="font-medium text-foreground">{req.item} <span className="text-muted-foreground">• {req.qty}</span></div>
                        <div className="text-xs text-muted-foreground mt-0.5">
                          Urgency: <span className={levelBadge(req.urgency)}>{req.urgency}</span>
                          {req.funding ? <span className="ml-2">Requested Funding: <span className="font-medium">{req.funding}</span></span> : null}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-success/30 text-success hover:bg-success hover:text-success-foreground"
                          onClick={() => transfer(selectedCountry, 'supplies')}>
                          <Package className="h-4 w-4 mr-1" /> Dispatch
                        </Button>
                        <Button size="sm" className="bg-gradient-primary" onClick={() => transfer(selectedCountry, 'funds')}>
                          <Banknote className="h-4 w-4 mr-1" /> Transfer
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-3 rounded-lg border border-primary/20 bg-primary/5">
                  <div className="flex items-center gap-2 text-sm">
                    <Wallet className="h-4 w-4 text-primary" />
                    <span className="font-medium text-foreground">Blockchain-secured transfer</span>
                    <span className="text-muted-foreground"> (simulated)</span>
                  </div>
                  {isTransferring && (
                    <div className="mt-2 text-xs text-muted-foreground">Submitting transaction...</div>
                  )}
                  {txHash && (
                    <div className="mt-2 text-xs">
                      <span className="inline-flex items-center gap-1 text-foreground">
                        <Hash className="h-3 w-3" /> Tx Hash:
                      </span>{" "}
                      <span className="font-mono">{txHash}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* State Cities Modal */}
      {showCitiesModal && selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCitiesModal(false)} />
          <div className="relative z-10 w-full max-w-2xl">
            <Card className="bg-card/80 backdrop-blur border-secondary/30 shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-secondary-foreground" />
                    <span>{selectedState} — City Priorities</span>
                  </span>
                  <div className="flex items-center gap-2">
                    {(["all","food","human","health"] as const).map(f => (
                      <Button key={f} size="sm" variant={citiesViewFilter === f ? "default" : "outline"} onClick={() => setCitiesViewFilter(f)}>
                        {f === "all" ? "All" : f[0].toUpperCase() + f.slice(1)}
                      </Button>
                    ))}
                    <Button variant="outline" size="sm" onClick={() => setShowCitiesModal(false)}>Close</Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(stateCities[selectedState] || [])
                    .slice()
                    .sort((a, b) => {
                      const v = (c: any) =>
                        (citiesViewFilter === "food" ? levelScore(c.food) : 0) +
                        (citiesViewFilter === "human" ? levelScore(c.human) : 0) +
                        (citiesViewFilter === "health" ? levelScore(c.health) : 0) +
                        (citiesViewFilter === "all" ? levelScore(c.food) + levelScore(c.human) + levelScore(c.health) : 0);
                      return v(b) - v(a);
                    })
                    .map((c, i) => (
                      <div key={i} className="p-3 border rounded-md flex items-center justify-between">
                        <div className="font-medium text-foreground">{c.name}</div>
                        <div className="flex gap-2 text-xs">
                          <span className={levelBadge(c.food)}>Food: {c.food}</span>
                          <span className={levelBadge(c.human)}>Human: {c.human}</span>
                          <span className={levelBadge(c.health)}>Health: {c.health}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Raise/Update State Crisis Modal */}
      {showCrisisModal && selectedState && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowCrisisModal(false)} />
          <div className="relative z-10 w-full max-w-2xl">
            <Card className="bg-card/80 backdrop-blur border-primary/30 shadow-[var(--shadow-elegant)]">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <PlusCircle className="h-5 w-5 text-primary" />
                    <span>Raise / Update Crisis — {selectedState}</span>
                  </span>
                  <Button variant="outline" size="sm" onClick={() => setShowCrisisModal(false)}>Close</Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!selectedState) return;

                    // Update nationalDetailsState
                    setNationalDetailsState(prev => {
                      const curr = prev[selectedState] || { causes: [], crises: [], requiredFundingUSD: 0, needs: [] };
                      const crises = [...curr.crises];
                      const idx = crises.findIndex(c => c.label === crisisLabel);
                      if (idx >= 0) crises[idx] = { ...crises[idx], level: crisisLevel };
                      else crises.push({ label: crisisLabel, level: crisisLevel });

                      const causes = causeInput ? Array.from(new Set([...(curr.causes || []), causeInput])) : curr.causes || [];
                      const needs = needInput ? Array.from(new Set([...(curr.needs || []), needInput])) : curr.needs || [];
                      const requiredFundingUSD = fundingInput ? Math.max(0, Number(fundingInput) || 0) : curr.requiredFundingUSD;

                      return { ...prev, [selectedState]: { crises, causes, needs, requiredFundingUSD } };
                    });

                    // Update nationalDataState conditions/alerts
                    setNationalDataState(prev =>
                      prev.map(s =>
                        s.state === selectedState
                          ? { ...s, conditions: conditionsInput, alerts: Math.max(0, Number(alertsInput) || 0) }
                          : s
                      )
                    );

                    setShowCrisisModal(false);
                  }}
                  className="space-y-4"
                >
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Crisis</label>
                      <select value={crisisLabel} onChange={(e) => setCrisisLabel(e.target.value as any)} className="w-full p-2 rounded-md border bg-background">
                        <option>Food Security</option>
                        <option>Humanitarian</option>
                        <option>Health</option>
                        <option>Infrastructure</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Severity</label>
                      <select value={crisisLevel} onChange={(e) => setCrisisLevel(e.target.value as any)} className="w-full p-2 rounded-md border bg-background">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Funding (USD)</label>
                      <Input type="number" min="0" value={fundingInput} onChange={(e) => setFundingInput(e.target.value)} placeholder="Optional" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Add Cause</label>
                      <Input value={causeInput} onChange={(e) => setCauseInput(e.target.value)} placeholder="e.g., Flooding in northern districts" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Add Need</label>
                      <Input value={needInput} onChange={(e) => setNeedInput(e.target.value)} placeholder="e.g., 50K food kits" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">State Conditions</label>
                      <select value={conditionsInput} onChange={(e) => setConditionsInput(e.target.value as any)} className="w-full p-2 rounded-md border bg-background">
                        <option value="stable">Stable</option>
                        <option value="moderate">Moderate</option>
                        <option value="poor">Poor</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground block mb-1">Alerts</label>
                      <Input type="number" min="0" value={alertsInput} onChange={(e) => setAlertsInput(e.target.value)} />
                    </div>
                  </div>

                  <Button type="submit" className="w-full bg-gradient-primary">
                    Save Update
                  </Button>
                  <div className="text-xs text-muted-foreground">Updates reflect instantly in the state row and details.</div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Government;