/* Curated clothing catalogue for Thread Row.
   Product photography uses Unsplash-hosted editorial fashion images. */

const PRODUCTS = [
  {
    id: "oversized-tee",
    name: "Essential Oversized Tee",
    category: "Unisex",
    price: 29,
    brand: "Thread Row Essentials",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=85",
    description: "A clean, relaxed-fit cotton tee with a softly structured silhouette. Designed to sit effortlessly with denim, trousers or layered under tailoring."
  },
  {
    id: "tailored-denim-jacket",
    name: "Vintage Wash Denim Jacket",
    category: "Women",
    price: 82,
    brand: "Thread Row Denim",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85",
    description: "A timeless denim layer with a relaxed shape and vintage-inspired wash. Easy over dresses, tanks and everyday separates."
  },
  {
    id: "relaxed-hoodie",
    name: "Studio Relaxed Hoodie",
    category: "Unisex",
    price: 56,
    brand: "Thread Row Essentials",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=85",
    description: "Soft brushed fleece, dropped shoulders and an easy fit create a polished take on the everyday hoodie."
  },
  {
    id: "satin-midi-dress",
    name: "Satin Slip Midi Dress",
    category: "Women",
    price: 74,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=1000&q=85",
    description: "A fluid midi silhouette with a subtle sheen and elegant drape. Style it with heels for evenings or layer it with denim for day."
  },
  {
    id: "straight-leg-jeans",
    name: "Classic Straight-Leg Jeans",
    category: "Men",
    price: 64,
    brand: "Thread Row Denim",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=85",
    description: "A versatile straight-leg profile with a clean finish and comfortable mid-rise. Made for effortless everyday styling."
  },
  {
    id: "minimal-sneakers",
    name: "Minimal Leather Sneakers",
    category: "Footwear",
    price: 78,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=85",
    description: "Streamlined low-top sneakers with a refined profile that works with denim, tailored trousers and relaxed weekend looks."
  },
  {
    id: "structured-blazer",
    name: "Soft-Shoulder Blazer",
    category: "Women",
    price: 96,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=85",
    description: "A modern single-breasted blazer with softly structured shoulders. Designed to elevate basics without feeling overdressed."
  },
  {
    id: "wide-leg-trousers",
    name: "Fluid Wide-Leg Trousers",
    category: "Women",
    price: 68,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
    description: "High-rise trousers with a graceful wide leg and fluid drape. A polished foundation for shirts, knits and fitted tops."
  },
  {
    id: "knit-cardigan",
    name: "Fine Knit Cardigan",
    category: "Women",
    price: 61,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=1000&q=85",
    description: "A lightweight knit cardigan with a clean neckline and softly fitted shape. Ideal for tonal layering throughout the season."
  },
  {
    id: "linen-shirt",
    name: "Relaxed Linen Shirt",
    category: "Men",
    price: 58,
    brand: "Thread Row Menswear",
    image: "https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1000&q=85",
    description: "An airy linen-blend shirt with an easy silhouette and understated finish. Wear it buttoned, open over a tee or half-tucked."
  },
  {
    id: "ankle-boots",
    name: "Sleek Ankle Boots",
    category: "Footwear",
    price: 94,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85",
    description: "A polished ankle boot with a streamlined toe and comfortable block heel. A versatile finishing piece for dresses and tailored looks."
  },
  {
    id: "crossbody-bag",
    name: "Structured Crossbody Bag",
    category: "Accessories",
    price: 72,
    brand: "Thread Row Accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=85",
    description: "A compact structured bag with an adjustable strap and clean hardware. Sized for the essentials and designed to finish a styled look."
  },
  {
    id: "aviator-sunglasses",
    name: "Modern Aviator Sunglasses",
    category: "Accessories",
    price: 34,
    brand: "Thread Row Eyewear",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=1000&q=85",
    description: "A refined aviator frame with a lightweight feel and timeless shape. The easy finishing touch for sunny-day styling."
  },
  {
    id: "ballet-flats",
    name: "Soft Leather Ballet Flats",
    category: "Footwear",
    price: 52,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=1000&q=85",
    description: "A graceful rounded-toe flat with a minimal profile. Comfortable enough for everyday wear and polished enough for dressed-up outfits."
  },
  {
    id: "silk-scarf",
    name: "Printed Silk Scarf",
    category: "Accessories",
    price: 38,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1584184924103-e310d9dc82fc?auto=format&fit=crop&w=1000&q=85",
    description: "A lightweight printed scarf designed to style at the neck, through belt loops or around a bag handle for an elevated finish."
  },

  {
    id: "women-ribbed-top",
    name: "Ribbed Square-Neck Top",
    category: "Women",
    price: 42,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1000&q=85",
    description: "A fitted ribbed top with a clean square neckline, designed for effortless pairing with denim, skirts and tailored trousers."
  },
  {
    id: "women-pleated-skirt",
    name: "Pleated Satin Midi Skirt",
    category: "Women",
    price: 70,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&w=1000&q=85",
    description: "A fluid pleated midi skirt with an elegant movement and polished finish for day-to-evening styling."
  },
  {
    id: "women-knit-dress",
    name: "Minimal Knit Midi Dress",
    category: "Women",
    price: 88,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85",
    description: "A softly fitted knit dress with a refined silhouette that looks equally effortless with flats or heels."
  },
  {
    id: "women-trench",
    name: "Classic Belted Trench Coat",
    category: "Women",
    price: 118,
    brand: "Thread Row Outerwear",
    image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&w=1000&q=85",
    description: "A timeless belted trench with clean lines and a relaxed drape, made for polished transitional-season outfits."
  },
  {
    id: "women-cropped-cardigan",
    name: "Cropped Button Cardigan",
    category: "Women",
    price: 54,
    brand: "Thread Row Studio",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=85",
    description: "A softly textured cropped cardigan with delicate buttons and an easy feminine shape."
  },
  {
    id: "women-heels",
    name: "Sculpted Pointed Heels",
    category: "Footwear",
    price: 86,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=1000&q=85",
    description: "Elegant pointed-toe heels with a sculpted profile designed to finish dresses, skirts and tailored looks."
  },
  {
    id: "women-loafers",
    name: "Polished Penny Loafers",
    category: "Footwear",
    price: 76,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=1000&q=85",
    description: "A refined loafer with a classic penny strap and sleek shape, ideal with trousers, denim or socks and skirts."
  },
  {
    id: "women-mini-bag",
    name: "Mini Shoulder Bag",
    category: "Accessories",
    price: 62,
    brand: "Thread Row Accessories",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=85",
    description: "A compact shoulder bag with a softly structured silhouette and minimal hardware for elevated everyday styling."
  },
  {
    id: "pearl-earrings",
    name: "Freshwater Pearl Earrings",
    category: "Accessories",
    price: 36,
    brand: "Thread Row Jewelry",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=85",
    description: "Elegant pearl drop earrings with a delicate profile that adds a refined touch to both everyday and evening outfits."
  },
  {
    id: "gold-hoop-earrings",
    name: "Sculpted Gold Hoop Earrings",
    category: "Accessories",
    price: 32,
    brand: "Thread Row Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
    description: "Minimal sculpted hoops with a warm gold finish, designed to complement casual, workwear and occasion looks."
  },
  {
    id: "layered-necklace",
    name: "Layered Chain Necklace",
    category: "Accessories",
    price: 39,
    brand: "Thread Row Jewelry",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=85",
    description: "A delicate layered chain necklace that brings subtle shine to simple tees, dresses and open-neck shirts."
  },
  {
    id: "pendant-necklace",
    name: "Fine Pendant Necklace",
    category: "Accessories",
    price: 29,
    brand: "Thread Row Jewelry",
    image: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1000&q=85",
    description: "A fine chain finished with a small pendant for understated everyday elegance."
  },
  {
    id: "stacking-rings",
    name: "Minimal Stacking Rings",
    category: "Accessories",
    price: 27,
    brand: "Thread Row Jewelry",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=85",
    description: "A versatile set of slim rings designed to wear individually or layered together for a modern jewelry edit."
  },
  {
    id: "leather-watch",
    name: "Classic Leather Watch",
    category: "Accessories",
    price: 58,
    brand: "Thread Row Accessories",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
    description: "A clean, understated watch with a leather strap and timeless dial for everyday polished styling."
  },
  {
    id: "men-overshirt",
    name: "Relaxed Utility Overshirt",
    category: "Men",
    price: 69,
    brand: "Thread Row Menswear",
    image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?auto=format&fit=crop&w=1000&q=85",
    description: "A relaxed overshirt with utility-inspired detailing, perfect layered over tees or worn as a light jacket."
  },
  {
    id: "men-oxford-shirt",
    name: "Premium Oxford Shirt",
    category: "Men",
    price: 55,
    brand: "Thread Row Menswear",
    image: "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=1000&q=85",
    description: "A crisp Oxford shirt with a comfortable modern fit, equally suited to smart-casual and office dressing."
  },
  {
    id: "men-bomber",
    name: "Clean Bomber Jacket",
    category: "Men",
    price: 92,
    brand: "Thread Row Menswear",
    image: "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&w=1000&q=85",
    description: "A streamlined bomber with a clean collar and versatile silhouette for modern everyday layering."
  },
  {
    id: "men-chinos",
    name: "Tapered Cotton Chinos",
    category: "Men",
    price: 59,
    brand: "Thread Row Menswear",
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1000&q=85",
    description: "Comfortable tapered chinos with a polished finish, made to pair easily with shirts, tees and knitwear."
  },
  {
    id: "men-knit-polo",
    name: "Fine Knit Polo Shirt",
    category: "Men",
    price: 63,
    brand: "Thread Row Menswear",
    image: "https://images.unsplash.com/photo-1627225924765-552d49cf47ad?auto=format&fit=crop&w=1000&q=85",
    description: "A refined knit polo with a soft drape and clean collar, bridging casual comfort and smart dressing."
  },
  {
    id: "men-derby-shoes",
    name: "Classic Derby Shoes",
    category: "Footwear",
    price: 98,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=1000&q=85",
    description: "Classic lace-up Derby shoes with a sleek leather profile for tailored trousers, chinos and formal occasions."
  },
  {
    id: "men-running-sneakers",
    name: "Everyday Runner Sneakers",
    category: "Footwear",
    price: 82,
    brand: "Thread Row Footwear",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85",
    description: "Lightweight everyday sneakers with a streamlined sporty shape that works with denim, joggers and casual tailoring."
  },
  {
    id: "leather-belt",
    name: "Minimal Leather Belt",
    category: "Accessories",
    price: 31,
    brand: "Thread Row Accessories",
    image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=1000&q=85",
    description: "A clean leather belt with understated hardware, designed to finish denim, chinos and tailored trousers."
  },
  {
    id: "classic-cap",
    name: "Structured Cotton Cap",
    category: "Accessories",
    price: 25,
    brand: "Thread Row Accessories",
    image: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=1000&q=85",
    description: "A minimalist structured cap with an easy everyday fit for casual street-style looks."
  },
  {
    id: "leather-wallet",
    name: "Slim Leather Wallet",
    category: "Accessories",
    price: 35,
    brand: "Thread Row Accessories",
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=1000&q=85",
    description: "A slim leather wallet with a clean profile designed to carry essentials without bulk."
  },
];

function getProductById(id){
  return PRODUCTS.find(p => p.id === id);
}
