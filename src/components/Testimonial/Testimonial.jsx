import React from "react";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import patientAvatar from "../../assets/images/patient-avatar.png";
import crisProfile from "../../assets/images/cris-profile.png";
import ivanProfile from "../../assets/images/ivan-profile02.png";
import santinoProfile from "../../assets/images/santino-profile.png";
import hernanProfile from "../../assets/images/hernan-profile.png";
import doloProfile from "../../assets/images/dolo-profile.png";
import { HiStar } from "react-icons/hi";

const Testimonial = () => {
  return (
    <div className="mt-[30px] lg:mt-[55px]">
      <Swiper
        modules={[Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }}
      >
        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-[13px]">
            <div className="flex itemx-center gap-[13px]">
              <img
                className="max-w-[60px] rounded-xl"
                src={ivanProfile}
                alt=""
              />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Iván Alvarez
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "Recibí atención médica de ellos. Estoy muy satisfecho con el
              trato y los servicios médicos que brindan."
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-[13px]">
            <div className="flex itemx-center gap-[13px]">
              <img
                className="max-w-[60px] rounded-xl"
                src={santinoProfile}
                alt=""
              />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Santino Romaya
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "Su atención médica fue excelente. Estoy muy agradecido por el
              cuidado y los servicios profesionales que recibí."
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-[13px]">
            <div className="flex itemx-center gap-[13px]">
              <img
                className="max-w-[60px] rounded-xl"
                src={crisProfile}
                alt=""
              />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Cristina Molina
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "Los servicios médicos que ofrecen son de primera calidad.
              Recomendaría a cualquiera que necesite atención médica."
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-[13px]">
            <div className="flex itemx-center gap-[13px]">
              <img
                className="max-w-[60px] rounded-xl"
                src={hernanProfile}
                alt=""
              />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Hernán Herrera
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "La calidad de atención que recibí fue excepcional. Estoy muy
              agradecido por su profesionalismo y cuidado."
            </p>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="py-[30px] px-5 rounded-[13px]">
            <div className="flex itemx-center gap-[13px]">
              <img
                className="max-w-[60px] rounded-xl"
                src={doloProfile}
                alt=""
              />
              <div>
                <h4 className="text-[18px] leading-[30px] font-semibold text-headingColor">
                  Dolores Larralde
                </h4>
                <div className="flex items-center gap-[2px]">
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                  <HiStar className="text-yellowColor w-[18px] h-5" />
                </div>
              </div>
            </div>
            <p className="text-[16px] leading-7 mt-4 text-textColor font-[400]">
              "La atención recibida superó mis expectativas. Agradezco
              profundamente su dedicación y cuidado profesional."
            </p>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Testimonial;
