import { useTranslation } from "react-i18next";
import { createQuestion, deleteQuestion, updateQuestion } from "../../../service/admin.service";
import AdministratorPanel from "../Table/AdministratorPanel";
import { getQuestions } from "../../../service/data.service";

export default function AdministratorPanelQuestion() {
    const { t } = useTranslation();

    const headCells = [
        {
            id: 'name',
            label: t('administrator_panel.question.quest'),
            minWidth: 250,
            align: 'center',
        },
    ]

    const modalOptions = {
        "title": t('administrator_panel.question.create_question'),
        "contentText": t('administrator_panel.question.create_name_question'),
        "label": t('administrator_panel.question.name_question'),
        "createElement": createQuestion,
        "updateElement": updateQuestion,
    }

    const toolbarOptions = {
        "title": t('administrator_panel.question.list_question'),
        "lableActionButton": t('administrator_panel.question.quest'),
        "deleteElement": deleteQuestion,
        "titleDeleteModalText": t('administrator_panel.question.confirm_delete_question'),
    }

    const menuItemsOption = [
        {
            to: "",
            text: t('administrator_panel.question.editor_quest'),
        },
    ]

    function createData({ title, id }) {
        const name = title;

        return {
            name,
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
                functionFetchData={getQuestions}
            />
        </>
    )
}