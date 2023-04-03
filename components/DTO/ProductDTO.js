export default class ProductDTO
{
    constructor(ID, Brand_ID, Category_ID, Name = "Name", Description = "Sản phẩm chất lượng cao",
     Thumbnail = "Source", Color = "Blue", State = "Còn", Evaluate = "Tốt",
        Insurance = "", Trademark = "", Price = 10000, Discount_ID = 1)
    {
        this.ID = ID;
        this.Brand_ID = Brand_ID;
        this.Category_ID = Category_ID;
        this.Name = Name;
        this.Description = Description;
        this.Thumbnail = Thumbnail;
        this.Color = Color;
        this.State = State;
        this.Evaluate = Evaluate;
        this.Insurance = Insurance;
        this.Trademark = Trademark;
        this.Price = Price;
        this.Discount_ID = Discount_ID;
    }
}