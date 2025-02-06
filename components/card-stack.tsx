import { Card, CardFooter, CardHeader, Divider } from "@heroui/react";
import { FC } from "react";

export interface CardStackProps {
    className?: string; 
}

export const CardStack: FC<CardStackProps> = () => {
    return (
        <div className="relative">
            <div className={`absolute top-10 scale-${90}`}>
                <Card className="w-[400px]" shadow='lg'>
                    <CardHeader className='h-24 justify-center'></CardHeader>
                    <Divider />
                    <CardFooter className='h-24 justify-center'></CardFooter>
                </Card>
            </div>
            <div className={`absolute top-5 scale-${95}`}>
                <Card className="w-[400px]" shadow='lg'>
                    <CardHeader className='h-24 justify-center'></CardHeader>
                    <Divider />
                    <CardFooter className='h-24 justify-center'></CardFooter>
                </Card>
            </div>
            <Card className="w-[400px]" shadow='lg'>
                <CardHeader className='h-24 justify-center'>Forest</CardHeader>
                <Divider />
                <CardFooter className='h-24 justify-center'>Лес</CardFooter>
            </Card>
        </div>
    )
}