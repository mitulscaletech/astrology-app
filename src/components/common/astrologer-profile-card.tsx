import { FC, useEffect, useState } from "react";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import Typography from "@/components/ui/typography";

import IconEdit from "@/shared/icons/edit";
import IconStar from "@/shared/icons/star";
import IconVideo from "@/shared/icons/video";
import IconGroups from "@/shared/icons/groups";

import DeleteDialog from "./delete-dialog";
import ImageCropDialog from "./image-crop-dialog";
import astrologerImg1 from "@/assets/images/dummy/astrologer-01.jpg";
import HttpService from "@/shared/services/http.service";
import { API_CONFIG } from "@/shared/constants/api";
import { IMAGE_MIME_TYPE } from "@/shared/constants";

const DATA = {
  id: 1,
  name: "Dr Ganesh Prasad Mishra",
  languages: ["English", "Hindi"],
  activeSessions: 26,
  totalSessions: 354,
  rating: 4.7,
  reviews: "Last 30 days",
  thumbnail: astrologerImg1,
  tags: ["Janma Kundali", "Muhurat", "Prashna Kundali"],
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
};

interface ProfileCardProps {
  isButtons?: boolean;
  isDesc?: boolean;
}

const ProfileCard: FC<ProfileCardProps> = ({ isButtons, isDesc = false }) => {
  const { data: session, update } = useSession();
  const [currentImage, setCurrentImage] = useState<FileList | null>(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openImageCropDialog, setOpenImageCropDialog] = useState(false);
  const [sessionDetails, setSessionDetails] = useState({ total_active_session: 0, total_session: 0 });

  const handleUploadMedia = (file: FileList | null) => {
    setCurrentImage(file);
    setOpenImageCropDialog(true);
  };

  const getDashboardStatistics = () => {
    HttpService.get(API_CONFIG.dashboardStatistic).then((response) => {
      if (!response.is_error) {
        setSessionDetails(response.data);
      }
    });
  };
  const handleUploadImage = (profile_photo: File) => {
    const formData = new FormData();
    formData.append("media_type", "profile_photo");
    formData.append("media_file", profile_photo);
    HttpService.post(API_CONFIG.uploadMedia, formData, {
      contentType: "multipart/form-data"
    }).then((response) => {
      if (!response.is_error) {
        update({
          ...session?.user,
          profilePhoto: response.data
        });
        setCurrentImage(null);
        setOpenImageCropDialog(false);
      }
    });
  };
  useEffect(() => {
    getDashboardStatistics();
  }, []);

  return (
    <div className="flex items-start flex-col md:flex-row my-2 lg:my-4 2xl:my-6 gap-4 md:gap-6 lg:gap-8 xl:gap-8 2xl:gap-12 4xl:gap-14 py-4 md:py-6 lg:py-8 xl:py-8 2xl:py-12 4xl:py-14 px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-14 4xl:px-16 rounded-lg xl:rounded-2xl 2xl:rounded-3xl shadow-card">
      <div className="w-32 md:w-40 xl:w-48 2xl:w-64 4xl:w-72 relative shrink-0 shadow-card">
        <Image
          src={session?.user?.profilePhoto || DATA.thumbnail}
          width={770}
          height={440}
          alt={DATA.name}
          className="w-full aspect-[278/288] rounded-xl xl:rounded-2xl object-cover"
        />
        <div className="flex justify-center items-center size-8 md:size-10 2xl:size-16 bg-accent-white absolute bottom-0 end-0 translate-y-1/4 translate-x-1/3 rounded-full shadow-card">
          <span className="w-7/12">
            <IconEdit />
          </span>
          <input
            type="file"
            accept={IMAGE_MIME_TYPE}
            className="absolute size-full bottom-0 end-0 opacity-0"
            onChange={(e) => handleUploadMedia(e.target.files)}
          />
        </div>
      </div>
      <div className="flex flex-col-reverse md:flex-row justify-between md:gap-2 grow">
        <div className="lg:w-10/12 2xl:w-9/12 4xl:w-8/12">
          <Typography variant="p" size="p" className="text-secondary/50 mb-2">
            {session?.user?.specializations.map((spe) => spe.specialization_name).join(" • ")}
          </Typography>
          <Typography variant="h3" size="h4" className="font-semibold">
            {`${session?.user?.first_name} ${session?.user?.last_name}`}
          </Typography>
          <div className="text-secondary/50 font-medium flex flex-col gap-2 md:gap-2.5 lg:gap-3 2xl:gap-4 my-2 md:my-3 lg:my-4 2xl:my-5 4xl:my-6">
            <p className="flex gap-3 items-center">
              <span className="size-5 lg:size-6">
                <IconVideo />
              </span>
              {sessionDetails.total_active_session || 0} Active Sessions
            </p>
            <p className="flex gap-3 items-center">
              <span className="size-5 lg:size-6">
                <IconGroups />
              </span>
              {sessionDetails.total_session || 0} Total Sessions
            </p>
          </div>
          {isButtons && (
            <div className="flex gap-2 md:gap-4 xl:gap-5 2xl:gap-6 mt-2 lg:mt-4 xl:mt-6 2xl:mt-8">
              <Button variant="outline">
                <Link href="/">earnings</Link>
              </Button>
              <Button variant="highlight">
                <Link href="/">MANAGE BOOKINGS</Link>
              </Button>
            </div>
          )}
          {isDesc && (
            <Typography variant="p" size="p" className="text-secondary/50">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </Typography>
          )}
        </div>
        <div className="w-full mb-2 md:w-auto flex text-center justify-between md:justify-center">
          <div className="flex flex-row md:flex-col gap-2 md:gap-0 items-center">
            <Typography
              variant="p"
              size="h3"
              className="font-bold flex gap-0.5 md:gap-1 lg:gap-1.5 2xl:gap-2 justify-center items-center text-secondary md:mb-1 lg:mb-2"
            >
              {DATA.rating}
              <span className="size-6 lg:size-8 xl:size-10 2xl:size-12 4xl:size-15">
                <IconStar />
              </span>
            </Typography>
            <Typography variant="p" size="p" className="text-secondary/50 font-medium">
              {DATA.reviews}
            </Typography>
          </div>
        </div>
      </div>
      <DeleteDialog
        isOpen={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        header="Delete?"
        description="Are you sure you want to delete this photo?"
        confirm={() => {}} //delete API method
      />
      <ImageCropDialog
        isOpen={openImageCropDialog}
        image={currentImage}
        header="Profile picture"
        onClose={() => setOpenImageCropDialog(false)} //manage delete
        handleDelete={() => setOpenDeleteDialog(true)}
        confirm={(cropImage: File) => handleUploadImage(cropImage)} //delete API method
      />
    </div>
  );
};

export default ProfileCard;
