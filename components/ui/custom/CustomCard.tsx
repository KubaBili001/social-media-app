import { ReactElement } from "react";

//ui
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../card";
import { Separator } from "../separator";

interface CardProps {
  width: number;
  title: string;
  description?: string;
  content: ReactElement;
  footer?: ReactElement;
}

export default function CustomCard({
  width,
  title,
  description,
  content,
  footer,
}: CardProps) {
  return (
    <Card style={{ width: `${width}px` }}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        {description && (
          <CardDescription className="text-sm">{description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-6">{content}</CardContent>
      {footer && (
        <>
          <Separator orientation="horizontal" />
          <CardFooter className="flex justify-between">{footer}</CardFooter>
        </>
      )}
    </Card>
  );
}
