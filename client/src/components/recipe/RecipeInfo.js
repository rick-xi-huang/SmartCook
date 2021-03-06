import React from 'react';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {makeStyles} from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Popover from '@material-ui/core/Popover';
import Card from "@material-ui/core/Card";
import CardActions from '@material-ui/core/CardActions';
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardActionArea from "@material-ui/core/CardActionArea";
import Container from "@material-ui/core/Container";
import Typography from '@material-ui/core/Typography';
import Link from "@material-ui/core/Link";
import LinkIcon from '@material-ui/icons/Link';
import DoneIcon from '@material-ui/icons/Done';
import IconButton from "@material-ui/core/IconButton";
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
import DeleteOutlinedIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(() => ({
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        height: 100,
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
        whiteSpace: "wrap",
        overflow: "hidden",
        minWidth: "0",
    },
    title: {
        fontSize: "16px",
        fontWeight: "bold",
    },
    icon: {
        flexGrow: 1,
        paddingLeft: 0,
        textAlign: 'left',
    },
}));

export default function RecipeInfo({getRecipeIngredients, recipe, userInfo, saveRecipe, switchDisplay, deleteRecipe}) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClickDone = () => {
        getRecipeIngredients(recipe);
    };


    return (
        <div>
            <Card className={classes.card} variant="outlined">
                <CardActionArea disableRipple>
                    <Link href={recipe["recipe"]["shareAs"]} target="_blank">
                        <CardMedia
                            className={classes.cardMedia}
                            image={recipe["recipe"]["image"]}
                            title={recipe["recipe"]["label"]}
                        />
                    </Link>
                </CardActionArea>
                <CardContent className={classes.cardContent} style={{height: "150px"}}>
                    <Typography gutterBottom variant="h5" component="h2" style={{textAlign: "left"}}>
                        <Link href={recipe["recipe"]["shareAs"]} target="_blank" title={recipe["recipe"]["label"]}
                              style={{textDecoration: "none", color: "inherit"}}>
                            {recipe["recipe"]["label"]}
                        </Link>
                    </Typography>
                </CardContent>
                <CardActions disableRipple>
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        <Card className={classes.card} variant="outlined">
                            <CardContent className={classes.cardContent}>
                                <Typography className={classes.title} paragraph>Ingredients:</Typography>
                                <Typography style={{textAlign: "left"}}>
                                    {recipe["recipe"]["ingredientLines"].map((item) => <li> {item} </li>)}
                                </Typography>
                                <p style={{
                                    textAlign: "left",
                                    backgroundColor: "transparent",
                                    margin: "3",
                                    fontSize: '24px'
                                }}/>
                                <Typography className={classes.title} paragraph>Health Labels:</Typography>
                                <Typography style={{textAlign: "left"}}>
                                    {recipe["recipe"]["dietLabels"].concat(recipe["recipe"]["healthLabels"]).map((item) =>
                                        <li> {item} </li>)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Popover>
                    <Container className={classes.icon}>
                        <Tooltip title="Click to see ingredients and health labels" placement="top" arrow>
                            <IconButton aria-label="more info" onClick={handleClick}>
                                <InfoOutlinedIcon size="small"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Click for recipe link" placement="top" arrow>
                            <IconButton aria-label="share" href={recipe["recipe"]["url"]} target="_blank">
                                <LinkIcon size="small"/>
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Click to edit and save recipe to journal" placement="top" arrow>
                            <IconButton aria-label="share" onClick={() => {
                                dispatch({type: 'RECIPE_ANNOTATION', payload: recipe["recipe"]});
                                history.push('/journal')
                            }}>
                                <EditOutlinedIcon size="small"/>
                            </IconButton>
                        </Tooltip>

                        {(switchDisplay === "hits" || switchDisplay === "popular") &&
                        <Tooltip title="Click to save recipe to favourites" placement="top" arrow>
                            <IconButton aria-label="share" onClick={() => saveRecipe(recipe, userInfo)}>
                                <FavoriteBorderOutlinedIcon size="small"/>
                            </IconButton>
                        </Tooltip>
                        }
                        {switchDisplay === "recipes" &&
                        <Tooltip title="Click to delete recipe from favourites" placement="top" arrow>
                            <IconButton aria-label="share" onClick={() => deleteRecipe(recipe["_id"])}>
                                <DeleteOutlinedIcon size="small"/>
                            </IconButton>
                        </Tooltip>
                        }
                        <Tooltip title="Click to check for ingredients in inventory" placement="top" arrow>
                            <IconButton aria-label="moreinfo" onClick={
                                handleClickDone
                            }>
                                <DoneIcon size="small"/>
                            </IconButton>
                        </Tooltip>
                    </Container>
                </CardActions>
            </Card>
        </div>
    );
}


