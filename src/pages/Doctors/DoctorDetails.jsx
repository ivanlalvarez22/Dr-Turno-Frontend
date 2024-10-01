import { useState } from "react";
import starIcon from "../../assets/images/Star.png";
import DoctorAbout from "./DoctorAbout";
import Feedback from "./Feedback";
import SidePanel from "./SidePanel";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useParams } from "react-router-dom";
import defaultProfile from "./../../assets/images/default-profile.png";

const DoctorDetails = () => {
  const [tab, setTab] = useState("about");

  const { id } = useParams();

  const {
    data: doctor,
    loading,
    error,
    refetch,
  } = useFetchData(`${BASE_URL}/doctors/${id}`);

  const {
    name = "",
    qualifications = [],
    experiences = [],
    timeSlots = [],
    reviews = [],
    appointments = [],
    bio = "",
    about = "",
    averageRating = 0,
    totalRating = 0,
    specialization = "Doctor",
    ticketPrice = 0,
    photo,
  } = doctor || {};

  return (
    <section>
      <div className="max-w-full w-[1280px] px-5 mx-auto">
        {loading && <Loader />}
        {error && <Error />}

        {!loading && !error && doctor && (
          <div className="lg:grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]">
            <div className="md:col-span-2">
              <div className="flex items-center gap-5">
                <figure className="w-[200px] h-[200px] relative flex items-center justify-center">
                  <img
                    src={photo || defaultProfile}
                    alt=""
                    className="object-cover max-h-[200px] rounded-md"
                  />
                </figure>

                <div>
                  <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-6 lg:py-2 lg:px-6 text-[12px] leading-5 lg:text-[16px] lg:leading-7 font-semibold rounded">
                    {specialization}
                  </span>
                  <h3 className="text-headingColor text-[22px] leading-9 mt-3 font-bold">
                    {name}
                  </h3>
                  <div className="flex items-center gap-[6px]">
                    <span className="flex items-center gap-[6px] text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-semibold text-headingColor">
                      <img src={starIcon} alt="" /> {averageRating.toFixed(1)}
                    </span>
                    <span className="text-[14px] leading-5 lg:text-[16px] lg:leading-7 font-[400] text-textColor">
                      ({totalRating})
                    </span>
                  </div>

                  <p className="text__para text-[14px] leading-6 md:text-[15px] lg:max-w-[390px]">
                    {bio}
                  </p>
                </div>
              </div>

              <div className="mt-[50px] border-b border-solid border-[#0066FF34] relative">
                <button
                  onClick={() => setTab("about")}
                  className={`${
                    tab === "about" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Acerca de
                </button>

                <button
                  onClick={() => setTab("feedback")}
                  className={`${
                    tab === "feedback" &&
                    "border-b border-solid border-primaryColor"
                  } py-2 px-2 mr-5 mt-5 text-[16px] leading-7 text-headingColor font-semibold`}
                >
                  Comentarios
                </button>
              </div>

              <div className="mt-[50px]">
                {tab === "about" && (
                  <DoctorAbout
                    name={name}
                    about={about}
                    qualifications={qualifications}
                    experiences={experiences}
                  />
                )}
                {tab === "feedback" && (
                  <Feedback
                    reviews={reviews}
                    totalRating={totalRating}
                    refetch={refetch}
                  />
                )}
              </div>
            </div>
            <div>
              <SidePanel
                doctorId={doctor._id}
                ticketPrice={ticketPrice}
                timeSlots={timeSlots}
                appointments={appointments || []} // Ensure appointments is an array
                refetch={refetch}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default DoctorDetails;
