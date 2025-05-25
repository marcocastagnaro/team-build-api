import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';

export class CreateNewsDto {
  @ApiProperty({
    description: 'The title of the news article',
    example: 'Team Wins Championship',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'The content of the news article',
    example: 'Our team has won the championship after an amazing season...',
  })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({
    description: 'The ID of the team this news belongs to',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsString()
  @IsNotEmpty()
  teamId: string;

  @ApiProperty({
    description: 'Whether the news article is published',
    example: true,
    required: false,
  })
  @IsBoolean()
  @IsOptional()
  isPublished?: boolean;
}
