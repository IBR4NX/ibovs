"use client";
import { useState } from 'react';
import { MapPin, Navigation, CheckCircle, Loader2 } from 'lucide-react';
// استيراد مكونات shadcn/ui
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LocationPicker() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGetLocation = () => {
    setLoading(true);
    if (!navigator.geolocation) {
      alert("متصفحك لا يدعم تحديد المواقع");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLoading(false);
      },
      (err) => {
        alert("يرجى السماح للمتصفح بالوصول لموقعك");
        setLoading(false);
      }
    );
  };

  return (
    <Card className="border-dashed border-2 bg-muted/50">
      <CardContent className="pt-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h4 className="font-bold flex items-center gap-2 text-lg">
              <MapPin className="h-5 w-5 text-primary" />
              موقع المتجر الجغرافي
            </h4>
            <p className="text-sm text-muted-foreground">
              هذا يحدد ظهورك للزبائن في منطقتك لزيادة الثقة وسرعة التوصيل.
            </p>
          </div>

          <Button 
            onClick={handleGetLocation} 
            disabled={loading}
            variant="default"
            className="w-full sm:w-auto shadow-sm"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري التحديد...
              </>
            ) : (
              <>
                <Navigation className="ml-2 h-4 w-4" />
                تحديد موقعي الآن
              </>
            )}
          </Button>
        </div>

        {coords && (
          <div className="mt-6">
            <Alert className="bg-green-50 border-green-200 text-green-800 dark:bg-green-900/10 dark:border-green-900/20 dark:text-green-400">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertTitle className="font-semibold text-right">تم التقاط الإحداثيات</AlertTitle>
              <AlertDescription className="text-right">
                تم تحديد موقعك بدقة: {coords.lat.toFixed(4)} , {coords.lng.toFixed(4)}
              </AlertDescription>
            </Alert>
            
            {/* حقل مخفي لإرسال البيانات مع الفورم */}
            <input 
              type="hidden" 
              name="location" 
              value={JSON.stringify({
                type: "Point",
                coordinates: [coords.lng, coords.lat] // تنسيق GeoJSON: [long, lat]
              })} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
