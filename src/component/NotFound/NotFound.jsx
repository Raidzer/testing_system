import { useTranslation } from "react-i18next"
import "./style.css"

export default function NotFound() {
	const { t } = useTranslation();

	return (
		<div id="notfound">
			<div className="notfound">
				<div className="notfound-404"></div>
				<h1>{t('not_found.error_404')}</h1>
				<h2>{t('not_found.title')}</h2>
				<a href="/">{t('not_found.link_text')}</a>
			</div>
		</div>
	)
}
