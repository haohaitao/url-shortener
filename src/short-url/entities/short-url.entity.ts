import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShortUrl {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  shortCode: string;

  @Column({ default: false })
  softDelete: boolean;
}
