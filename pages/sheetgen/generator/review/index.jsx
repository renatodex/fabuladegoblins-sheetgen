import styles from './style.module.scss'
import { store } from 'modules/redux_store'
import { useEffect } from 'react'

export function getProps() {
  let sheetData = store.getState().sheet_data
  return {
    ...sheetData
  }
}

export default function () {
  let attributes = {}
  let props = {}
  let hpPoints
  let mpPoints
  let attackPoints
  let defensePoints

  let calculateModifier = function (amount) {
    return Math.floor(amount / 3) - 2
  }

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SKIP_STEPS && !store.getState().sheet_data.character_name) {
      Router.push('/sheetgen/generator')
    }
  }, [])

  props = getProps()

  attributes = props?.attributes_data
  let selectedWeapon = props?.selected_weapon
  let selectedWeaponAttribute = props?.selected_weapon?.attribute__handle?.[0]
  let selectedArmor = props?.selected_armor

  let initialHp = parseInt(props.class_data?.initial_hp)
  let initialMp = parseInt(props.class_data?.initial_mp)
  hpPoints = initialHp + parseInt(attributes?.strength)
  mpPoints = initialMp + parseInt(attributes?.intelligence)
  let strength = parseInt(attributes?.strength)
  let agility = parseInt(attributes?.agility)
  let weaponAttackBonus = parseInt(selectedWeapon?.attack_bonus) || 0
  let armorDefenseBonus = parseInt(selectedArmor?.defense_bonus) || 0
  attackPoints = 10 + calculateModifier(parseInt(attributes[selectedWeaponAttribute])) + weaponAttackBonus
  defensePoints = 10 + calculateModifier(Math.max(strength, agility)) + armorDefenseBonus

  return (
    <div>
      <h1>Revisão das suas Escolhas:</h1>

      <div className={styles['review_blocks']}>
        <div className={styles['review_block']}>
          <h2 className={styles['title']}>Nome do Personagem</h2>
          <p>{ props?.character_name }</p>
        </div>

        <div className={styles['review_block']}>
          <h2 className={styles['title']}>Nome do Jogador</h2>
          <p>{ props?.player_name }</p>
        </div>

        <div className={styles['review_block']}>
          <h2 className={styles['title']}>{ props?.race_data?.name }</h2>
          <p><img src={ props?.race_data?.attachments?.[0]?.url } width={'50%'} /></p>
        </div>

        <div className={styles['review_block']}>
          <h2 className={styles['title']}>{ props?.class_data?.name }</h2>
          <p><img src={ props?.class_data?.attachments?.[0]?.url } width={'50%'} /></p>
        </div>

        <div className={
            [
              styles['review_block'],
              styles['review_block--attributes']
            ].join(' ')
        }>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Força <span>{attributes?.strength}</span> ({ calculateModifier(attributes?.strength || 0) })</h2>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Agilidade <span>{attributes?.agility}</span> ({ calculateModifier(attributes?.agility || 0) })</h2>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Inteligencia <span>{attributes?.intelligence}</span> ({ calculateModifier(attributes?.intelligence || 0) })</h2>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Carisma <span>{attributes?.charisma}</span> ({ calculateModifier(attributes?.charisma || 0) })</h2>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Destino <span>{attributes?.destiny}</span> ({ calculateModifier(attributes?.destiny || 0) })</h2>
          </div>
        </div>

        <div className={
            [
              styles['review_block'],
              styles['review_block--attributes']
            ].join(' ')
        }>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Pontos de Vida</h2>
            <p className={styles['pool_attribute']}>{hpPoints}</p>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Pontos de Mana</h2>
            <p className={styles['pool_attribute']}>{mpPoints}</p>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Pontos de Ataque</h2>
            <p className={styles['pool_attribute']}>{attackPoints}</p>
          </div>
          <div className={styles["attribute_block"]}>
            <h2 className={styles["attribute-label"]}>Pontos de Defesa</h2>
            <p className={styles['pool_attribute']}>{defensePoints}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
