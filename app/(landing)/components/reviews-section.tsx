import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export function ReviewsSection() {
  const reviews = [
    {
      name: "John Smith",
      role: "Restaurant Owner",
      avatar: "/images/avatar-1.jpg",
      content:
        "BillDee has made managing my restaurant so much easier. The billing system is fast, customers are impressed, and most importantly, I can monitor sales in real-time.",
      rating: 5,
    },
    {
      name: "Sarah Wilson",
      role: "Boutique Manager",
      avatar: "/images/avatar-2.jpg",
      content:
        "Easy to use, convenient, and fast. It saves so much time in our daily operations. The reporting system is excellent, making business analysis much simpler.",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Hardware Store Owner",
      avatar: "/images/avatar-3.jpg",
      content:
        "Worth the investment! Great for inventory management, quick billing process means no long customer queues. Highly recommended for any retail business.",
      rating: 5,
    },
  ];

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
          />
        </svg>
      ));
  };

  return (
    <section className="py-16 bg-slate-50/50">
      <div className="container px-4 mx-auto">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground">
              Real experiences from BillDee users
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Avatar>
                      <AvatarImage src={review.avatar} alt={review.name} />
                      <AvatarFallback>{review.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{review.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {review.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex mb-4">{renderStars(review.rating)}</div>
                  <p className="text-gray-600">{review.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
