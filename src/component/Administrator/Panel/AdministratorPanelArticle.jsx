import { useTranslation } from "react-i18next";
import AdministratorPanel from "../Table/AdministratorPanel";
import { createArticle, deleteArticle, updateTitleArticle } from "../../../service/admin.service";
import { getArticles } from "../../../service/data.service";

export default function AdministratorPanelArticle() {
    const { t } = useTranslation();

    const headCells = [
        {
            id: 'name',
            label: t('administrator_panel.article.name'),
            minWidth: 250,
            align: 'center',
        },
    ]
    const modalOptions = {
        "title": t('administrator_panel.article.button_new_article'),
        "contentText": t('administrator_panel.article.name_new_article'),
        "label": t('administrator_panel.article.label_new_article'),
        "createElement": createArticle,
        "updateElement": updateTitleArticle,
    }

    const toolbarOptions = {
        "title": t('administrator_panel.article.list_articles'),
        "lableActionButton": t('administrator_panel.article.lable_action_button'),
        "deleteElement": deleteArticle,
        "titleDeleteModalText": t('administrator_panel.article.title_delete_modal'),
    }

    function createData({ title, id }) {
        const name = title;

        return {
            name,
            id,
        };
    }

    const menuItemsOption = [
        {
            to: "",
            text: t('administrator_panel.article.settings_article'),
        },
    ]

    return (
        <>
            <AdministratorPanel
                headCells={headCells}
                modalOptions={modalOptions}
                toolbarOptions={toolbarOptions}
                menuItemsOption={menuItemsOption}
                createData={createData}
                functionFetchData={getArticles}
            />
        </>
    )
}