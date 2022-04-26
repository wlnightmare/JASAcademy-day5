import { Button, styled, Divider } from "@mui/material"

const ProductBlock = styled('div')`
  background: rgb(255, 255, 255);
  padding: 8px 12px;
  margin-bottom: 6px;
`
const Header = styled('div')`
  display: flex;
  padding-bottom: 12px;
  margin-bottom: 6px;
`
const Bottom = styled('div')`
  display: flex;
	justify-content: space-between;
	align-items: center;
`
const Img = styled('img')`
  object-fit:contain;
  width: 64px;
  height: 64px;
  flex: 0 0 auto;
  margin-right: 16px;
`
const Title = styled('h3')`
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  color: rgb(0, 0, 0);
  margin: 0px 0px 4px;
`
const Discription = styled('p')`
  font-size: 12px;
  white-space:pre-wrap;
  color: rgb(92, 99, 112)
`
const ProductCounter = styled('div')`
  background-color: rgb(243, 243, 247);
	box-sizing: border-box;
	border-radius: 9999px;
	height: 32px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 8px;
`
export function BasketItem({ product, onRemove, onIncrementProduct,onDecrementProduct, count }) {
  return (
    <>
    <Divider variant="middle" style={{marginBottom:'10px'}}/>
    <ProductBlock>
      <Header style={{display:"flex"}}>
        <Img src={product.image} alt=""/>
        <div>
          <Title>{product.title}</Title>
          <Discription>{product.description}</Discription>
        </div> 
      </Header>
      <Bottom>
      <h3 style={{fontSize: "16px",fontWeight: "600", paddingLeft:'10px'}}>{product.price}$ </h3>
      <ProductCounter>
        <Button style={{cursor:"pointer", color:"rgb(0,0,0)"}} onClick={()=>onIncrementProduct(product.id)}>+</Button>
        <p>{count}</p>
        <Button style={{cursor:"pointer", color:"rgb(0,0,0)"}} onClick={()=>onDecrementProduct(product.id)}>-</Button>
        <Button onClick={(e)=>onRemove(e,product.id)}>Delete</Button>
      </ProductCounter>
      </Bottom>
    </ProductBlock>
  </>
  )
}