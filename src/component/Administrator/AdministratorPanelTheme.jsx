import { useTranslation } from "react-i18next";
import { createQuestion, createTheme, deleteQuestion, deleteTheme, updateQuestion, updateTitleTheme } from "../../service/admin.service";
import AdministratorPanel from "./Table/AdministratorPanel";
import { getThemes } from "../../service/data.service";

export default function AdministratorPanelTheme() {
    const { t } = useTranslation();

    const headCells = [
        {
            id: 'name',
            label: t('administrator_panel.theme.name'),
            minWidth: 250,
            align: 'center',
        },
        {
            id: 'articles',
            label: t('administrator_panel.theme.articles'),
            minWidth: 250,
            align: 'center',
        },
        {
            id: 'tickets',
            label: t('administrator_panel.theme.tickets'),
            minWidth: 250,
            align: 'center',
        },
    ]

    const modalOptions = {
        "titleNew": t('administrator_panel.theme.button_new_theme'),
        "titleChange": t('administrator_panel.theme.change_theme'),
        "contentText": t('administrator_panel.theme.name_new_theme'),
        "label": t('administrator_panel.theme.label_new_theme'),
        "createElement": createTheme,
        "updateElement": updateTitleTheme,
    }

    const toolbarOptions = {
        "title": t('administrator_panel.theme.list_themes'),
        "lableActionButton": t('administrator_panel.theme.lable_action_button'),
        "deleteElement": deleteTheme,
        "titleDeleteModalText": t('administrator_panel.theme.title_delete_modal'),
    }


    const menuItemsOption = [
        {
            to: `/articles`,
            text: t('administrator_panel.theme.setting_articles')
        },
        {
            to: `/questions`,
            text: t('administrator_panel.theme.setting_questions')
        }
    ]

    function createData({ title, id }) {
        const name = title;
        const articles = id;
        const tickets = 10 + id;

        return {
            name,
            articles,
            tickets,
            id,
        };
    }
    return (
        <>
            <AdministratorPanel
                headCells={headCells}
                modalOptions={modalOptions}
                toolbarOptions={toolbarOptions}
                menuItemsOption={menuItemsOption}
                createData={createData}
                functionFetchData={getThemes}
            />
        </>
    )
}