import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { AstrologerService } from "@/shared/interface";
import IconClock from "@/shared/icons/clock";
import IconCheck from "@/shared/icons/check";
import Link from "next/link";

interface AstrologerServicesProps {
  services: AstrologerService[];
}

export function AstrologerServices({ services }: AstrologerServicesProps) {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-secondary-100 p-6">
        <h2 className="text-xl font-semibold text-primary-800 mb-6">Services Offered</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="border-primary-200 overflow-hidden flex flex-col">
              <CardHeader className="bg-gradient-to-r from-primary-50 to-primary-100 pb-4">
                <CardTitle className="text-primary-800 text-xl">{service.name}</CardTitle>
                <CardDescription className="flex items-center mt-2">
                  <span className="h-4 w-4 mr-1 text-primary-500">
                    <IconClock />
                  </span>
                  {service.duration}
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-4">
                <div className="text-2xl font-bold mb-4">
                  ₹{service.price}
                  <span className="text-sm font-normal text-gray-500 ml-1">/ session</span>
                </div>

                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="h-5 w-5 text-success mr-2 mt-0.5 flex-shrink-0">
                        <IconCheck />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="border-t border-primary-100 pt-4 mt-auto">
                <Button className="w-full" asChild>
                  <Link href="/user/service-list/janma-kundali-holistic-life-blueprint">Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
