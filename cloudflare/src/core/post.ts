interface Post {
    id: string;
    title: string;
    content: string;
    timestamp: string;
}

interface CreatePostDto {
    title: string;
    content: string;
}

export  { Post, CreatePostDto }