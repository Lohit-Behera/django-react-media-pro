import React from 'react'
import { useState } from 'react';
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Eye, EyeOff } from 'lucide-react';

function CustomPassword({ id, label, placeholder, change }) {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="grid gap-2">
            <Label className='md:text-base' htmlFor={id}>{label}</Label>
            <div className='flex h-9 w-full rounded-md border border-input bg-transparent shadow-sm transition-colors placeholder:text-muted-foreground focus-within:ring-1 ring-ring'>
                <Input
                    className='text-sm md:text-base h-auto border-0 focus-visible:outline-none focus-visible:ring-0 bg-background w-full'
                    id={id}
                    type={showPassword ? 'text' : 'password'}
                    placeholder={placeholder}
                    required
                    onChange={change}
                />
                <span
                    onClick={() => setShowPassword(!showPassword)}
                    className='px-1 py-1 cursor-pointer'
                >
                    {showPassword ? <EyeOff /> : <Eye />}
                </span>
            </div>
        </div>
    )
}

export default CustomPassword