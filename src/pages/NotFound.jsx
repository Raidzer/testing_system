import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";


const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div className="text-center">
      <h1 className="h4 text-muted">{t("not_found.title") }</h1>
      <p className="text-muted">
        {t("not_found.message")}
        <Link to="/"> {t("not_found.link_text")}</Link>
      </p>
    </div>
  )
}

export default NotFound;