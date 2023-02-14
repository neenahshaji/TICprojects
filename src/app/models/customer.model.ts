import { RequestBaseModel, ResppnseBaseModel } from "./request-base.model";

type CustomerModel = {
    id: number;
    name: string;
    city: string;
    salesRepCode: string;
    email: string;
    revId: string;
    rowId: string;
}
type RatesModel = {
    uomCode: string
    rate: number
    discountPercent1: number
    discountPercent2: number
    discountPercent3: number
    discountPercent4: number
    discountPercent5: number
    qtyBreak1: number
    qtyBreak2: number
    qtyBreak3: number
    qtyBreak4: number
    qtyBreak5: number
    unitPrice1: number
    unitPrice2: number
    unitPrice3: number
    unitPrice4: number
    unitPrice5: number
}
type ItemsModel = {
    brandId: string;
    categoryId: string;
    description: string;
    partNumber: string;
    rates?: RatesModel;
    stock: number
}
type LoginRequestModel = {
    email: string;
    password: string;
} & RequestBaseModel;
type LoginResponseModel = {
    customer?: CustomerModel;
    token?: string;
} & ResppnseBaseModel;
type getItemRequestModel = {
    CustomerId: number
    term: string
    brandId: string
    categoryId: string
    offset: number
    limit: number
} & RequestBaseModel;
type getItemResponseModel = {
    code: number
    items: ItemsModel


} & ResppnseBaseModel;
type brandsmodel = {
    brandId: string
    description: string
}
type GetbrandResponseModel = {
    brands: brandsmodel
    code: number

} & ResppnseBaseModel;
type categoriesmodel = {
    categoryId: string
    description: string
}
type GetcategoriesResponseModel = {
    categories: categoriesmodel
    code: number

} & ResppnseBaseModel;

type summarymodel = {

    id: number

    customerId: number

    customerName: string

    orderDate: string

    grossAmount: number

    discount: number

    vat: number

    netAmount: number

}

type getMyOrdersResponseModel = {

    code: number

    summary: summarymodel

} & ResppnseBaseModel;

type getMyOrdersRequestModel = {

    CustomerId: number

    fromDate: string

    toDate: string

    offset: number

    limit: number

} & RequestBaseModel;
type CreateOrdersRequestModel = {
    customerId: number
    salesOrder: salesOrderModel
} & RequestBaseModel;

type salesOrderModel = {
    id: number
    customerId: number
    customerName: string
    customerCity: string
    orderDate: string
    grossAmount: number
    discount: number
    vat: number
    netAmount: number
    remarks: string
    poNumber: string
    address: string
    details:detailsModel
}
type detailsModel = {
    id: number
    itemCode: string
    itemName?: string
    qty: number
    rate: number
    grossAmount: number
    discount: number
    vat: number
    netAmount: number
    uom: string
}
type CreateOrdersResponseModel = {

    code: number

    salesOrder: salesOrderModel

} & ResppnseBaseModel;
type getOrdersResponseModel = {

    code: number

    order: salesOrderModel

} & ResppnseBaseModel;



type getOrdersRequestModel = {

    customerId: number

    id: number

   } & RequestBaseModel;




export {
    LoginRequestModel, CustomerModel, LoginResponseModel, getItemRequestModel,
    getItemResponseModel, ItemsModel, GetbrandResponseModel, brandsmodel,
    GetcategoriesResponseModel, categoriesmodel, getMyOrdersResponseModel, getMyOrdersRequestModel,
    CreateOrdersRequestModel,CreateOrdersResponseModel,getOrdersRequestModel,getOrdersResponseModel
};