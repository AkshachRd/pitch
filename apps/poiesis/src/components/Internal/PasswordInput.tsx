'use client';
import { useState, forwardRef, type ForwardedRef, type ComponentProps } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Input as OriginalInput } from '@/components/ui/input';
import { cn } from '@/utils/style';

type Props = ComponentProps<'input'>;

function PasswordInput(
    { className, type, ...props }: Props,
    forwardedRef: ForwardedRef<HTMLInputElement>,
) {
    const [showPassword, setShowPassword] = useState<boolean>(false);

    return (
        <div className={cn('relative', className)}>
            <OriginalInput
                ref={forwardedRef}
                {...props}
                className="w-full pr-9 text-sm"
                type={showPassword ? type : 'password'}
            />
            <div className="absolute right-1 top-0.5 flex h-8 w-8 cursor-pointer items-center justify-center text-gray-500">
                {showPassword ? (
                    <EyeOff className="h-5 w-5 scale-90" onClick={() => setShowPassword(false)} />
                ) : (
                    <Eye className="h-5 w-5 scale-90" onClick={() => setShowPassword(true)} />
                )}
            </div>
        </div>
    );
}

const Password = forwardRef(PasswordInput);
Password.displayName = 'PasswordInput';

export { Password };
