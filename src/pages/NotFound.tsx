
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-muted-foreground mb-4">Страница не найдена</p>
        <Button asChild>
          <Link to="/dashboard">Вернуться на главную</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
