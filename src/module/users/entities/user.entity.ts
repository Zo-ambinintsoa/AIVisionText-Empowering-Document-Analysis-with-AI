// Import necessary modules and decorators from TypeORM
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  BeforeInsert,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

// Import any other related entities or decorators here

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string; // Note: Password should be hashed and stored securely

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  // Define relationships with other entities here

  // Example of a one-to-many relationship with documents
  // Uncomment and customize as needed
  // @OneToMany(() => Document, (document) => document.user)
  // documents: Document[];

  // Example of a one-to-many relationship with notifications
  // Uncomment and customize as needed
  // @OneToMany(() => Notification, (notification) => notification.user)
  // notifications: Notification[];

  // Add more relationships as needed

  // Add a BeforeInsert hook to hash the password before insertion
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10); // Hash the password with a salt factor of 10
  }
}
