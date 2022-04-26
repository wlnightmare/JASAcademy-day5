import {Button, styled, Drawer, Divider, Badge} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close'
import { ShoppingBag } from "@mui/icons-material";
import {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { removeFromBasket, incrementProduct, decrementProduct, OPEN_MODAL } from "../../store/actions/shopActions";
import { BasketItem } from "./BasketItem";

const Wrapper = styled('div')`
  position: fixed;
  z-index: 1000;
  display: flex;
  justify-content:center;
  align-items:center;
  right: 20px;
  top: 100px;
  transition: 0.2s;
  `
const BasketIcon = styled(ShoppingBag)`
  font-size: 50px;
  color: rgb(255, 105, 0);
  cursor:pointer;
`
const EmptyBasket = styled('div')`
  display:flex;
  flex-direction: column;
  flex: 0 1 auto;
  padding: 30px;
  height: 100%;
  .note{
    flex:1;
    display:flex;
    justify-content: center;
    align-items: center;
    flex-direction:column;
    font-weight: bold;
  }
  .return {
    background-color: rgb(255, 105, 0);;
    color: rgb(255, 255, 255);
    font-size: 16px;
    line-height: 24px;
    border-radius: 9999px;
    cursor: pointer;
  }
`
const HeadTitle = styled('h1')`
  margin: 5px 10px 10px 30px;
  font-size: 24px;
  font-weight: 400px;
`
const CloseButton = styled(CloseIcon)`
  cursor: pointer;
  margin-left: 10px;
`
const HeaderSection = styled('section')`
  padding: 16px; 
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const CheckSection = styled('section')`
  padding: 16px;
`
const Check = styled('div')`
  display: flex;
  justify-content: space-between;
  font-size: 16px;
  padding-bottom: 16px;
  .paymant {
    font-size: 18px;
    line-height: 18px;
    font-weight:bold;
    font-style:normal;
  }
`
const Box = styled('div')`
  background: rgb(243, 243, 247);
  display: flex;
  flex-direction:column;
  flex:1 1 auto;
`

export function Basket() {
    const [isOpen, setIsOpen] = useState(false)
    const basket = useSelector((state) => state.shop.basket)
    const totalProduct = {}
    totalProduct.amount = useMemo(()=>
      basket.reduce((acc, product) => acc + product.count, 0
    ), [basket])

    totalProduct.price = useMemo(()=>
      basket.reduce((acc,product) => acc + product.count * product.product.price, 0
    ), [basket])

    const dispatch = useDispatch()

    const handleRemoveFromBasket = useCallback((e,id) => {
      e.stopPropagation();
      dispatch(removeFromBasket(id))
    }, [dispatch])

    const handleIncrementProduct = useCallback((id) => {
      dispatch(incrementProduct(id))
    },[dispatch])

    const handleDecrementProduct = useCallback((id) =>{
      dispatch(decrementProduct(id))
    },[dispatch])

    const handleModalOpen = useCallback (()=>{
      dispatch({type:OPEN_MODAL})
    },[dispatch])

    return (
      <>
      <Wrapper>
        <Badge badgeContent={totalProduct.amount} color="primary">
          <BasketIcon onClick={()=>setIsOpen(true)}></BasketIcon>
        </Badge>
      </Wrapper>
      <Drawer 
        anchor="right" 
        open={isOpen} 
        onClose={()=>setIsOpen(!isOpen)}
        >
        <Box sx={{width:{md:'450px', xs:'100%'},}}>
        {basket.length > 0 ? (
          <>
          <HeaderSection>
            <HeadTitle>{totalProduct.amount} items for {totalProduct.price.toFixed(2)}$ </HeadTitle>
            <CloseButton onClick={()=>setIsOpen(!isOpen)}></CloseButton>
          </HeaderSection>
          <div>
            {basket.map((product) => (
              <BasketItem
                product={product.product}
                onRemove={handleRemoveFromBasket}
                onIncrementProduct={handleIncrementProduct}
                onDecrementProduct={handleDecrementProduct}
                key={product.product.id}
                count={product.count}
              />
            ))}
          </div>
          <CheckSection>
          <Divider variant="middle" style={{marginTop:'10px',marginBottom:'10px'}}/>
            <Check>
              <p>{totalProduct.amount} items</p>
              <p>{totalProduct.price.toFixed(2)}$</p>
            </Check>
          <Divider variant="middle" style={{marginTop:'10px',marginBottom:'10px'}}/>
            <Check>
              <p className="paymant">Total paymant:</p>
              <p className="paymant">{totalProduct.price.toFixed(2)}$</p>
            </Check>
          </CheckSection>
          <Button onClick={handleModalOpen} style={{backgroundColor:'rgb(209, 87, 0)',
    color: 'rgb(0, 0, 0)',margin:'auto 15px 5px 15px', borderRadius:'10px'}}>Purchase</Button>
          </>
        ):(
          <EmptyBasket>
            <div className="note">
              <p>Your basket is empty :c</p>
              <p>Add something</p>
            </div>
              <Button className="return" onClick={()=>setIsOpen(!isOpen)}>Back to Shop</Button>
          </EmptyBasket>
        )}
      </Box>
      </Drawer>
    </>
  )
}
