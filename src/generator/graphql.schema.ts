
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export enum CategoryType {
    TYPE = "TYPE",
    MAKE = "MAKE",
    ROASTER = "ROASTER",
    FLAVOR = "FLAVOR",
    ROAST_LEVEL = "ROAST_LEVEL",
    PROCESSING = "PROCESSING",
    REGION = "REGION",
    LOCATION = "LOCATION"
}

export enum PublishedScope {
    web = "web",
    global = "global"
}

export enum Status {
    active = "active",
    archived = "archived",
    draft = "draft"
}

export enum WeightUnit {
    g = "g",
    kg = "kg",
    oz = "oz",
    lb = "lb"
}

export enum InventoryPolicy {
    deny = "deny",
    "continue" = "continue"
}

export class ChangePassword {
    oldPassword: string;
    newPassword: string;
}

export class SortFieldInput {
    colId?: string;
    sort?: string;
}

export class PagingInput {
    page?: number;
    pageSize?: number;
    sortModel?: SortFieldInput[];
    filterModel?: JSONObject;
}

export class LoginUserInput {
    username: string;
    password: string;
}

export interface PagedResult {
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
}

export abstract class IQuery {
    abstract accounts(): Account[] | Promise<Account[]>;

    abstract categories(): Category[] | Promise<Category[]>;

    abstract groupedCategories(): JSON | Promise<JSON>;

    abstract productPagedQuery(pagingInfo: PagingInput, status?: Status): ProductPagedResult | Promise<ProductPagedResult>;

    abstract hello(): string | Promise<string>;

    abstract today(): Date | Promise<Date>;

    abstract user(_id: string): User | Promise<User>;
}

export abstract class IMutation {
    abstract updateAccount(input: ChangePassword): boolean | Promise<boolean>;

    abstract login(input: LoginUserInput): LoginResponse | Promise<LoginResponse>;
}

export class Account {
    _id: string;
    username?: string;
    password?: string;
    createdBy?: ByUser;
    updatedAt?: number;
    updatedBy?: ByUser;
    fullName?: string;
}

export class Category {
    _id: string;
    name?: string;
    type?: CategoryType;
}

export class Image {
    _id: string;
    productId?: string;
    position?: number;
    name?: string;
    alt?: string;
    width?: number;
    height?: number;
    src?: string;
    createdAt?: Date;
    createdBy?: ByUser;
    updatedAt?: Date;
    updatedBy?: ByUser;
}

export class Product {
    _id: string;
    collectionId?: string;
    title?: string;
    bodyHtml?: string;
    vendor?: string;
    handle?: string;
    templateSuffix?: string;
    publishedScope?: PublishedScope;
    tags?: string[];
    status?: Status;
    image?: Image;
    images?: Image[];
    variants?: ProductVariant[];
    options?: ProductOption[];
    createdAt?: Date;
    createdBy?: ByUser;
    updatedAt?: Date;
    updatedBy?: ByUser;
    publishedAt?: Date;
    publishedBy?: ByUser;
}

export class ProductPagedResult implements PagedResult {
    currentPage?: number;
    pageCount?: number;
    pageSize?: number;
    rowCount?: number;
    items?: Product[];
}

export class ProductOption {
    _id: string;
    productId?: string;
    name?: string;
    position?: number;
    values?: string[];
}

export class ProductVariant {
    _id: string;
    productId?: string;
    title?: string;
    position?: number;
    sku?: string;
    price?: number;
    compareAtPrice?: string;
    fullfillmentService?: string;
    inventoryManagement?: string;
    inventoryPolicy?: InventoryPolicy;
    inventoryQuantity?: number;
    presentmentPrices?: PresentmentPrice[];
    option1?: string;
    option2?: string;
    option3?: string;
    barcode?: string;
    grams?: number;
    imageId?: string;
    taxable?: boolean;
    weight?: number;
    weightUnit?: WeightUnit;
    requiresShipping?: boolean;
    createdAt?: Date;
    createdBy?: ByUser;
    updatedAt?: Date;
    updatedBy?: ByUser;
}

export class Price {
    currencyCode?: string;
    amount?: string;
}

export class PresentmentPrice {
    price?: Price;
    compareAtPrice?: Price;
}

export class ByUser {
    _id?: string;
    username?: string;
    fullName?: string;
}

export class User {
    _id: string;
    idAccount: string;
    isActive?: boolean;
    createdAt?: number;
    updatedAt?: number;
    fullName: string;
}

export class LoginResponse {
    accessToken: string;
}

export type JSON = any;
export type JSONObject = any;
export type Upload = any;
