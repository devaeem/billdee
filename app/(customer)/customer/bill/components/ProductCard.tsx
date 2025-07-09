"use client";

interface ProductCardProps {
  product: {
    name: string;
    // icon: React.ReactNode;
    color: string;
  };
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <div
    className={`group relative bg-white hover:bg-${product.color}-50 border rounded-lg p-3 cursor-pointer transition-all hover:shadow-md`}
    onClick={onClick}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className={`font-medium text-${product.color}-700`}>
        {product.name}
      </span>
    </div>
    <p className="text-xs text-gray-500">คลิกเพื่อเพิ่มรายการ</p>
  </div>
);

export default ProductCard;
