import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Shield, Users, MapPin, Activity, AlertTriangle, Heart } from "lucide-react";
import heroImage from "@/assets/hero-crisis-center.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Capsule</h1>
                <p className="text-sm text-muted-foreground">Crisis Response Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-2 w-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-muted-foreground">System Active</span>
              <Button
                variant="ghost"
                size="sm"
                className="hidden md:inline-flex text-muted-foreground hover:text-primary"
                onClick={() => navigate("/gov/login")}
              >
                <Shield className="h-4 w-4 mr-1" />
                Gov Login
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="Crisis Response Center"
            className="w-full h-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-slide-up">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Emergency Response
              <br />
              Command Center
            </h2>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              Real-time crisis management and emergency response coordination for governments and citizens. 
              Monitor resources, track emergencies, and coordinate relief efforts.
            </p>
          </div>
        </div>
      </section>

      {/* Public Access Only */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Get Help Now</h3>
            <p className="text-muted-foreground">
              Public emergency assistance portal. Government access is secured and not listed here.
            </p>
          </div>

          <Card
            className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 bg-card/70 backdrop-blur"
            onClick={() => navigate('/public')}
          >
            <CardContent className="p-10">
              <div className="text-center space-y-8">
                <div className="mx-auto w-24 h-24 bg-gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-[var(--shadow-elegant)]">
                  <Users className="h-12 w-12 text-primary-foreground" />
                </div>

                <div>
                  <h4 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                    Public Emergency Portal
                  </h4>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Request help, find nearby resources, view alerts, and share your location for faster response.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <Button className="w-full bg-gradient-primary" onClick={() => navigate('/public')}>
                    Report Emergency
                  </Button>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/public')}>
                    Check Resources
                  </Button>
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground" onClick={() => navigate('/public')}>
                    Share Location
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Futuristic quick stats */}
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            <Card className="p-0 bg-card/60 backdrop-blur border-primary/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Live Resources</p>
                  <p className="text-2xl font-bold text-primary">24/7</p>
                </div>
                <Heart className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card className="p-0 bg-card/60 backdrop-blur border-success/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Nearby Shelters</p>
                  <p className="text-2xl font-bold text-success">15+</p>
                </div>
                <MapPin className="h-8 w-8 text-success" />
              </CardContent>
            </Card>
            <Card className="p-0 bg-card/60 backdrop-blur border-warning/20">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className="text-2xl font-bold text-warning">3</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4 text-foreground">Real-Time Emergency Monitoring</h3>
            <p className="text-muted-foreground">Comprehensive tracking and coordination of emergency resources</p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, label: "Medical", status: "available", count: "24/7" },
              { icon: MapPin, label: "Shelter", status: "limited", count: "15 Units" },
              { icon: Activity, label: "Food Supply", status: "stable", count: "Adequate" },
              { icon: AlertTriangle, label: "Emergency", status: "active", count: "3 Alerts" }
            ].map((item, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-card transition-all duration-300">
                <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  item.status === 'available' ? 'bg-success/10 text-success' :
                  item.status === 'limited' ? 'bg-warning/10 text-warning' :
                  item.status === 'stable' ? 'bg-primary/10 text-primary' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold mb-2 text-foreground">{item.label}</h4>
                <p className="text-2xl font-bold text-primary mb-1">{item.count}</p>
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  item.status === 'available' ? 'bg-success/10 text-success' :
                  item.status === 'limited' ? 'bg-warning/10 text-warning' :
                  item.status === 'stable' ? 'bg-primary/10 text-primary' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  <div className={`w-2 h-2 rounded-full mr-1 ${
                    item.status === 'available' ? 'bg-success' :
                    item.status === 'limited' ? 'bg-warning' :
                    item.status === 'stable' ? 'bg-primary' :
                    'bg-destructive'
                  }`}></div>
                  {item.status}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Capsule Crisis Response</span>
          </div>
          <p className="text-muted-foreground">
            © 2024 Capsule Platform. Emergency response coordination for safer communities.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;