import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Character {
  @PrimaryColumn()
  public idBlizzard: number

  @Column()
  public name: string

  @Column()
  public level: number

  @Column()
  public class: string

  @Column()
  public race: string

  @Column()
  public lastConnexion: Date

  @Column()
  public vh: number

  @Column()
  public gapOfVhSinceLastWeek: number

  @UpdateDateColumn()
  public lastUpdate: Date
}

export default Character
