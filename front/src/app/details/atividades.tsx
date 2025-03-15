import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Montserrat } from "next/font/google";
import ic_loc from "@/public/locale.svg";
import Image from "next/image";

const montserrat = Montserrat({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
});

interface Activity {
  name: string;
  location: string;
}

interface ActivityGridProps {
  activities: Activity[];
  selectedActivities: string[];
  onActivityChange: (activity: string, checked: boolean) => void;
}

export default function ActivityGrid({
  activities,
  selectedActivities,
  onActivityChange,
}: ActivityGridProps) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {activities.map((activity) => (
          <Card key={activity.name} className="bg-surface cursor-pointer">
            <CardContent className="flex justify-between items-center p-4">
              <div>
                <p className={`${montserrat.className} font-bold`}>{activity.name}</p>
                <div className="flex items-center gap-2 mt-1">
                  <Image src={ic_loc} alt="Local" width={16} height={16} />
                  <p className={`${montserrat.className} text-sm text-gray-500`}>{activity.location}</p>
                </div>
              </div>
              <Checkbox
                checked={selectedActivities.includes(activity.name)}
                onCheckedChange={(checked) => onActivityChange(activity.name, checked as boolean)}
                />

            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
