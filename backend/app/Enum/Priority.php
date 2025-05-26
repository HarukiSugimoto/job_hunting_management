<?php

namespace App\Enum;
enum Priority: int
{
    case High = 1; // 高
    case Medium = 2; // 中
    case Low = 3; // 低

    public function label(): string
    {
        return match ($this) {
            self::High => '高',
            self::Medium => '中',
            self::Low => '低',
        };
    }

    public static function toArray(): array
    {
        return array_map(
            fn($case) => (object)['value' => $case->value, 'label' => $case->label()],
            self::cases()
        );
    }
}
