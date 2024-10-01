import DoctorCard from "./../../components/Doctors/DoctorCard";
import Testimonial from "../../components/Testimonial/Testimonial";
import { BASE_URL } from "./../../config";
import useFetchData from "./../../hooks/useFetchData";
import Loader from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";
import { useEffect, useState } from "react";

const removeAccents = (str) => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const Doctores = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(removeAccents(query));
    }, 250);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  const filteredDoctors = doctors?.filter(
    (doctor) =>
      removeAccents(doctor.name)
        .toLowerCase()
        .includes(debounceQuery.toLowerCase()) ||
      removeAccents(doctor.specialization)
        .toLowerCase()
        .includes(debounceQuery.toLowerCase())
  );

  return (
    <>
      <section className="bg-[#FFF9EA]">
        <div className="container text-center">
          <h2 className="heading">Encuentra un doctor</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bt-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor bg-[#0066ff2c]"
              placeholder="Buscar doctor por nombre o especialización"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            <button
              className="btn mt-0 rounded-[0px] rounded-r-md"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loader />}
          {error && <Error />}
          {!loading && !error && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {filteredDoctors.map((doctor) => (
                <DoctorCard key={doctor._id} doctor={doctor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="xl:w-[470px] mx-auto">
            <h2 className="heading text-center">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text__para text-center">
              Atención de clase mundial para todos. Nuestro sistema de salud
              ofrece atención médica experta inigualable.
            </p>
          </div>
          <Testimonial />
        </div>
      </section>
    </>
  );
};

export default Doctores;
