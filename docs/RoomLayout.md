

# Position & Rotation

**Position**
Ne pas dépasser `-0.49 ⟺ 0.49`. pour éviter de clip à travers les murs.

**Rotation** 
L'axe principal est le Y, les autres pas besoin. L'angle max possible doit être compris entre `-Math.PI/2 ⟺ Math.PI/2`.
Pour n'effectuer aucune rotation, placer un `new Euler` sans aucun param.

Exemples:

- Place l'objet au fond de la salle au centre
```ts
{
  type: 'bookshelfAnger',
  position: new Vector3(0, 0, -0.49),
  rotation: new Euler,
}
```

- Place l'objet à droite, au milieu du mur de droite
```ts
{
  type: 'bookshelfAnger',
  position: new Vector3(0.49, 0, -0.25),
  rotation: new Euler(0, -Math.PI/2, 0),
}
```

- Place l'objet à gauche, au milieu du mur de gauche
```ts
{
  type: 'bookshelfAnger',
  position: new Vector3(-0.49, 0, -0.25),
  rotation: new Euler(0, Math.PI/2, 0),
}
```




# Props