import React from 'react'
import { useRouter } from 'next/router'
// Components
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import {
    Drawer,
    Divider,
    Link,
    Typography,
    MenuList,
    MenuItem,
    Hidden,
} from '@mui/material'
import { default as NextLink } from 'next/link'
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined'
import ProfileBaseActions from '../shared/BaseActions'
import UserInformation from '../shared/UserInformation'
// Helper
import { isVerifiedUser, hasDashboardPermission } from '../../../util'
// Schemas
import { Role, UserProfile } from '../../../domain/user'
import { LinkSchema } from '../../../api/schemas/link'
// Style
import { makeStyles } from '@mui/styles'
// I18n
import { useTranslation } from 'next-i18next'
import { isDefined } from '../../../libraries/util/assertions'

interface MobileSidebarProps {
    externalLinks?: LinkSchema[]
    user?: UserProfile<Role>
    onLogout: () => void
}

const useStyles = makeStyles((theme) => ({
    root: {
        ...theme.typography.button,
        padding: theme.spacing(1),
    },
    typography: {
        fontSize: '1rem',
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingBottom: theme.spacing(1),
    },
    link: {
        display: 'flex',
        flexDirection: 'row',
        "&:hover": {
            color: 'black',
        },
        "&.Mui-focusVisible": {
            outline: 'none',
            color: 'black',
        },
    },
    item: {
        minHeight: 'auto',
    },
    itemIcon: {
        minWidth: 'auto',
        marginRight: theme.spacing(2),
    },
    avatar: {
        color: 'white',
        backgroundColor: '#f88913',
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginBottom: '4px',
    },
}))

const MobileSidebar: React.FC<MobileSidebarProps> = (props) => {
    // State
    const [open, setOpen] = React.useState(false)
    // Hooks
    const classes = useStyles()
    const router = useRouter()
    const { t } = useTranslation(['header'])

    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)

    return (
        <React.Fragment>
            <Hidden implementation={'css'} xsDown>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerOpen}
                    style={{ marginLeft: '8px' }}
                >
                    <span className={classes.root}>{t('menu_label')}</span>
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Hidden implementation={'css'} smUp>
                <IconButton
                    color="inherit"
                    edge="start"
                    onClick={handleDrawerOpen}
                    style={{ marginLeft: '8px' }}
                >
                    <MenuIcon />
                </IconButton>
            </Hidden>
            <Drawer anchor={'right'} open={open} onClose={handleDrawerClose}>
                <nav aria-label={t('header:menu_label')} onClick={handleDrawerClose}>
                    {isVerifiedUser(props.user) && (
                        <>
                            <UserInformation user={props.user!} />
                            <Divider />
                            <Typography className={classes.typography} id={'menu_user_area_label'} variant={'h6'}>
                                {t('menu_user_area_label')}
                            </Typography>
                            <MenuList aria-labelledby={'menu_user_area_label'}>
                                <ProfileBaseActions
                                    onLogout={props.onLogout}
                                    autoFocus={open}
                                    showDashboardLink={hasDashboardPermission(props.user)}
                                />
                            </MenuList>
                        </>
                    )}
                    <Divider />
                    <Typography className={classes.typography} id={'external_links_label'} variant={'h6'}>
                        {t('external_links_label')}
                    </Typography>
                    <MenuList aria-labelledby={'external_links_label'}>
                        {props.externalLinks?.map(
                            (link, index) =>
                                isDefined(link.fields) && (
                                    <MenuItem
                                        className={classes.item}
                                        key={link.fields.label + index}
                                        onClick={() => router.push(link.fields!.path)}
                                    >
                                        <NextLink href={link.fields.path} passHref>
                                            <Link color={'textPrimary'} underline={'none'} className={classes.link}>
                                                <LaunchOutlinedIcon
                                                    aria-hidden={true}
                                                    fontSize="small"
                                                    className={classes.itemIcon}
                                                />
                                                {link.fields.label}
                                            </Link>
                                        </NextLink>
                                    </MenuItem>
                                )
                        )}
                    </MenuList>
                </nav>
            </Drawer>
        </React.Fragment>
    )
}

export default MobileSidebar
