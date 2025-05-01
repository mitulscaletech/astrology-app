import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { IAstrologer } from "@/shared/interface/index.ts";
import IconStar from "@/shared/icons/star";
import Link from "next/link";

interface AstrologerCardProps {
  astrologer: IAstrologer;
}

export function AstrologerCard({ astrologer }: AstrologerCardProps) {
  return (
    <Card className="overflow-hidden border-primary-100 hover:shadow-md transition-shadow duration-300">
      <CardHeader className="bg-primary-100/50">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-primary-700">{astrologer.full_name}</h3>
            <p className="text-sm text-primary-500">{astrologer.email}</p>
          </div>
          <div className="flex items-center">
            <span className="h-4 w-4 fill-warning text-warning mr-1">
              <IconStar />
            </span>
            <span className="font-medium">{astrologer.id}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Experience: {astrologer.intake_form?.years_of_experience} years</p>
          <div className="flex flex-wrap gap-2">
            {astrologer?.specializations?.map((language: any) => (
              <Badge
                key={language}
                variant="default"
                className="bg-secondary-100 text-secondary-700 border-secondary-200"
              >
                {language}
              </Badge>
            ))}
          </div>
        </div>
        <p className="text-sm line-clamp-3">{astrologer?.intake_form?.short_bio}</p>
      </CardContent>
      <CardFooter className="border-t border-primary-100 pt-4">
        <Button className="w-full bg-primary hover:bg-primary-600" asChild>
          <Link href={`/user/astrologers/${astrologer.full_name}`}>View Profile</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
