import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>รายได้รวมทั้งหมด</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ฿1,250,000
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +12.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            รายได้เพิ่มขึ้นในเดือนนี้ <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">เทียบกับ 6 เดือนที่ผ่านมา</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>รายได้ออนไลน์</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ฿750,000
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +15%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ยอดขายออนไลน์เพิ่มขึ้น <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">60% ของรายได้ทั้งหมด</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>รายได้หน้าร้าน</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            ฿500,000
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +8%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            ยอดขายหน้าร้านเพิ่มขึ้น <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">40% ของรายได้ทั้งหมด</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>อัตราการเติบโต</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            12.5%
          </CardTitle>
          <CardAction>
            <Badge variant="outline">
              <IconTrendingUp />
              +4.5%
            </Badge>
          </CardAction>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            การเติบโตเป็นไปตามเป้าหมาย <IconTrendingUp className="size-4" />
          </div>
          <div className="text-muted-foreground">เทียบกับไตรมาสที่ผ่านมา</div>
        </CardFooter>
      </Card>
    </div>
  );
}
