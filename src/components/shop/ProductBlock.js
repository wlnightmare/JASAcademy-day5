import {Button, styled} from "@mui/material";

const Box = styled('div')`
  padding: 16px 16px 12px 16px;
  box-sizing: border-box;
  border-radius: 8px;
  transition: .2s;
  &:hover {
    box-shadow: 0 10px 20px 5px rgba(0,0,0,.1);
    border-radius: 10px;
    background-color: rgb(255, 240, 230);
  }
`
const StyledButton =styled(Button)`
    background-color: rgb(255, 240, 230);
    color: rgb(209, 87, 0);
    font-size: 16px;
    line-height: 24px;
    border-radius: 15px;
    cursor: pointer;
`
const Image = styled('img')`
  width: 240px;
  height: 260px;
  object-fit: contain;
`
const Title = styled('h3')`
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: #19191D;
  margin-top: 12px;
`
const Price = styled('h3')`
  font-size: 24px;
  color: rgb(0, 0, 0);
  margin-top: 12px;
`
const Description = styled('p')`
  line-height: 14px;
  height:28px;
  font-size: 14px;
  overflow: hidden;
  white-space:pre;
  text-overflow: ellipsis;
  color: rgb(92, 99, 112);
`

export function ProductBlock({ product, onAddToBasket }) {
    return (
        <Box>
            <Image src={product.image} alt="" />
            <Title>{product.title}</Title>
            <Description>{product.description}</Description>
            <div style={{display:'flex', justifyContent:'space-between'}}>
            <Price>{product.price}$</Price>
            <StyledButton onClick={onAddToBasket}>Add to Basket</StyledButton>
            </div>
        </Box>
    )
} 