import { useNavigate} from "react-router-dom";
import { useEffect, useState } from "react";
import { getProfile } from "../services/profileService";

import DefaultImage from "../assets/ProfilePhoto.png";
import { getBalance } from "../services/balanceService";
import formatRupiah from "../utils/formatRupiah";
import { getServices } from "../services/serviceService";
import { getBanners } from "../services/bannerService";

function Dashboard() {

  const navi = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);

  const [balance, setBalance] = useState(null);

  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [serviceError, setServiceError] = useState(null);

  const [banners, setBanners] = useState([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [bannerError, setBannerError] = useState(false);

  // get default image or api image
  const profileImage =
    profileData?.profile_image &&
    !profileData.profile_image.endsWith("/null")
      ? profileData.profile_image
      : DefaultImage;

  // get profile and balance
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await getProfile(); // from profileService.js
        const saldo = await getBalance();

        setProfileData(profile); // include first_name, last_name, profile_image
        setBalance(saldo);
      } catch (error) {
        if (error.message === "UNAUTHORIZED") {
          navi("/login");
        } else {
          console.error(error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
  }, [navi]);

  // get services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servData = await getServices();
        setServices(servData);
      } catch (error) {
        setServiceError(error.message || "Gagal memuat layanan");
      } finally {
        setLoadingServices(false);
      }
    };

    fetchServices();
  }, []);

  // get banner
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (error) {
        setBannerError(error.message || "Gagal memuat banner");
      } finally {
        setLoadingBanners(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>

      <div className="flex flex-col md:flex-row justify-center p-5">
        <div className="flex flex-1 flex-col p-8 space-y-2 justify-center">
          <img
            src={profileImage}
            alt="Profile-image"
            width={80}
            height={80}
            className="rounded-full"
          />
          <div>
            <p classname="text-md">Selamat datang,</p>
            <p className="text-2xl font-bold">{profileData?.first_name} {profileData?.last_name}</p>
          </div>
        </div>
        <div className="flex flex-1 flex-col bg-[#ED3B2D] text-white space-y-2 p-8 rounded-lg justify-center align-middle">
          <p classname="text-md">Saldo anda</p>
          <p className="text-2xl font-bold">{formatRupiah(balance)}</p>
        </div>
      </div>

      <div>
        {loadingServices && <p>Loading layanan...</p>}

        {serviceError && (
          <p>{serviceError}</p>
        )}

        {!loadingServices && !serviceError && (
          <div className="flex overflow-x-auto justify-between">
            {services.map((service) => ( 
              <button
                key={service.service_code}
                onClick={() =>
                  navi(`/payment/${service.service_code}`)
                }
                className="flex items-center p-4 flex-col w-30 space-y-2 shrink-0"
              >
                <img 
                src={service.service_icon} 
                alt="" 
                className="w-15 rounded-md" 
                />
                <span className="text-sm">{service.service_name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className=" flex flex-col space-y-2">
        <h2>Temukan promo menarik</h2>

        {loadingBanners && <p>Loading banner...</p>}

        {bannerError && (
          <p>{bannerError}</p>
        )}

        {!loadingBanners && !bannerError && (
          <div className="flex flex-row space-x-5 overflow-x-auto">
            {banners.map((banner, index) => (
              <div
                key={index}
                className="shrink-0"
              >
                <img
                  src={banner.banner_image}
                  alt={banner.banner_name}
                />
              </div>
            ))}
          </div>
        )}
      </div>


    </div>
  );
}

export default Dashboard;
