import { useContext, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import classes from './ItemCard.module.css'
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useNavigate } from 'react-router-dom';
import { cart } from '../../contexts/CartContext';


function ItemCard(props) {
    const { dispatch } = useContext(cart);
    const navigate = useNavigate();
    // const [qty, setQty] = useState(1)

    const handlerAddCart = () => {
        dispatch({
            type: "ADD_TO_CART", payload: {
                "id": props.itemId,
                "name": props.itemName,
                "price": props.price,
                "imgUrl": props.imgPath,
                "quantity": 1
            }
        })

        console.log("add");

    }


    let discountAmt = Math.floor(((props.MRP - props.price) / props.MRP).toFixed(2) * 100);
    return (
        <>
            <Card className={classes.card} sx={{ maxWidth: 300 }}>
                <div className={classes.button} >
                    <Chip label={`${discountAmt}%Off`} className={classes.discountClass} />
                    <CardMedia
                        component="img"
                        height="160"
                        image={props.imgPath}
                        alt="green iguana"
                    />

                    <CardContent>
                        <Typography className={classes['item-title']} gutterBottom variant="h7" component="div">{props.itemName}
                        </Typography>
                        <span style={{ color: '#225718' }}>{`${discountAmt}%Off`}</span>
                        <Typography variant="body1" color="text.secondary" component="h3"><span class={classes["sold-out"]}>{`₹${props.MRP}`}</span> {`₹${props.price}`}
                        </Typography>
                        <Typography>
                            {props.quantity > 0 ? <Button variant="contained" size="small" className={classes.addCartBtn} onClick={() => handlerAddCart(props.itemId)}>Add to Cart</Button> :
                                <Button variant="contained" size="small" className={classes.outOfStackBtn} disabled >Out of Stack</Button>}
                            <MdOutlineFavoriteBorder className={classes.icon} />
                        </Typography>
                    </CardContent>
                </div>
            </Card>

        </>
    )
}

export default ItemCard;
