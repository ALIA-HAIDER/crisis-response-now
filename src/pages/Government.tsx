import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
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
  ChevronLeft
} from "lucide-react";

type ViewMode = 'international' | 'national' | 'local';

const Government = () => {
  const [currentView, setCurrentView] = useState<ViewMode>('international');
  const navigate = useNavigate();

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

  const getStatusColor = (status: string) => {
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

  const getStatusIcon = (status: string) => {
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
                          <Badge className={getStatusColor(item.starvation)}>
                            {getStatusIcon(item.starvation)}
                            <span className="ml-1">{item.starvation}</span>
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Health:</span>
                          <Badge className={getStatusColor(item.health)}>
                            {getStatusIcon(item.health)}
                            <span className="ml-1">{item.health}</span>
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground mr-2">Living:</span>
                          <Badge className={getStatusColor(item.living)}>
                            {getStatusIcon(item.living)}
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
                <CardTitle className="flex items-center space-x-2">
                  <Flag className="h-5 w-5" />
                  <span>National State Overview - India</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {nationalData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="font-semibold text-foreground min-w-[150px]">{item.state}</div>
                        <div className="text-sm text-muted-foreground">{item.population}</div>
                      </div>
                      <div className="flex items-center space-x-6">
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
                      </div>
                    </div>
                  ))}
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
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
};

export default Government;