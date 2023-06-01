import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { getFirstName, getLastName, getStatusLoadingUser } from '../../store/user';
import NavThemes from '../../component/nav-section/NavThemes';
import { School } from '@mui/icons-material';
import { LinkButton } from '../../component/LinkButton';
import { UserInfo } from '../../component/nav-section/UserInfo';
import { useTranslation } from 'react-i18next';

const NAV_WIDTH = 350;

export default function Nav() {
    const firstName = useSelector(getFirstName());
    const lastName = useSelector(getLastName());
    const isLoadingUserInfo = useSelector(getStatusLoadingUser());
    const { t } = useTranslation()
    const renderContent = (
        <Box>
            <Box sx={{ mb: 5, mx: 5 }}>
                <UserInfo firstName={firstName} lastName={lastName} />
            </Box>
            <Typography
                variant="h6"
                fontWeight="bold"
                sx={{
                    color: 'text.primary',
                    textAlign: 'center'
                }}
            >

                {t("nav.title_theme")}
            </Typography>
            <NavThemes />
            <Box>
                <LinkButton
                    link={'/exam'}
                    text={t("nav.title_exam")}
                    startIcon={< School />}
                />
            </Box>
        </Box>
    );

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { lg: 0 },
                width: { lg: NAV_WIDTH },
            }}
        >
            {isLoadingUserInfo ? null : renderContent}
        </Box>
    )
};