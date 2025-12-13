export type Camera = {
id: number;
name: string;
vendorCode: string;
type:string;
category: string;
description: string;
level: string;
price: number;
rating: number;
reviewCount: number;
previewImg: string;
previewImg2x: string;
previewImgWebp: string;
previewImgWebp2x: string;
}

export type Cameras = Camera[];

export type CartItem = {
  camera: Camera;
  quantity: number;
};

export type CartItems = CartItem[];

export type DetailedCamera = Camera;

export type DetailedCameras = DetailedCamera[];

export type PromoCamera = {
id: number;
name: string;
previewImg: string;
previewImg2x: string;
previewImgWebp: string;
previewImgWebp2x: string;
}

export type PromoCameras = PromoCamera[]
