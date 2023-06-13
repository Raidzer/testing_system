import { useTranslation } from "react-i18next"

export default function Welcome() {
    const { t } = useTranslation();

    return (
        <div>
            {t("welcome")}
        </div>
    )
}