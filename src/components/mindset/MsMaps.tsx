/** Book maps from Mindset for IELTS L3 (cropped from Students' Book scans). */

import fosburyMaps from "../../assets/ms-fosbury-maps.png";
import hollowayEstate from "../../assets/ms-holloway-estate.png";
import castleMuseumPlan from "../../assets/ms-castle-museum-plan.png";

function BookMap({
  src,
  title,
  alt,
  className = "",
}: {
  src: string;
  title: string;
  alt: string;
  className?: string;
}) {
  return (
    <figure className={`ms-book-map ${className}`.trim()}>
      <figcaption className="ms-book-map__caption">{title}</figcaption>
      <img className="ms-book-map__img" src={src} alt={alt} draggable={false} />
    </figure>
  );
}

/** Writing U3 Exam — Fosbury outskirts 1980 + 2015 (Students' Book p.64). */
export function MsFosburyMaps() {
  return (
    <BookMap
      className="ms-book-map--fosbury"
      src={fosburyMaps}
      title="Outskirts of Fosbury in 1980 and 2015"
      alt="Two maps showing the outskirts of Fosbury in 1980 and 2015, as in the coursebook"
    />
  );
}

/** Listening U3 practice — castle museum plan with Places A–C (Students' Book). */
export function MsStatelyHomePlan() {
  return (
    <BookMap
      className="ms-book-map--plan"
      src={castleMuseumPlan}
      title="Castle museum · Places A–C"
      alt="Floor plan of a castle museum with places A–C, Grand Hall, Exhibition Room and Library"
    />
  );
}

/** Listening U3 exam — Holloway Estate map A–I (Students' Book p.68). */
export function MsHollowayEstateMap() {
  return (
    <BookMap
      className="ms-book-map--holloway"
      src={hollowayEstate}
      title="Holloway Estate"
      alt="Holloway Estate map with lettered locations A–I for labelling"
    />
  );
}
