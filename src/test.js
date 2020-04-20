[
    {
      name: 'Top Level',
      attributes: {
        keyA: 'val A',
        keyB: 'val B',
        keyC: 'val C',
      },
      children: [
        {
          name: 'Level 2: A',
          nodeSvgShape:  {
            shape: 'rect',
            shapeProps: {
              width: 20,
              height: 20,
              x: -10,
              y: -10,
            },
          },
          attributes: {
            keyA: 'val A',
            keyB: 'val B',
            keyC: 'val C',
          },
          children: [
            {
              name: 'Son of A',
              nodeSvgShape:  {
                shape: 'rect',
                shapeProps: {
                  width: 20,
                  height: 20,
                  x: -10,
                  y: -10,
                },
              },
              attributes: {
                keyA: 'val A',
                keyB: 'val B',
                keyC: 'val C',
              },
            },
            {
              name: 'Daughter of A',
              attributes: {
                keyA: 'val A',
                keyB: 'val B',
                keyC: 'val C',
              },
            },
            {
              name: 'Son of A',
              nodeSvgShape:  {
                shape: 'rect',
                shapeProps: {
                  width: 20,
                  height: 20,
                  x: -10,
                  y: -10,
                },
              },
            },
            {
              name: 'Daughter of A',
            },
          ],
        },
        {
          name: 'Level 2: B',
          children: [
            {
              name: 'Son of B',
              nodeSvgShape:  {
                shape: 'rect',
                shapeProps: {
                  width: 20,
                  height: 20,
                  x: -10,
                  y: -10,
                },
              },
            },
            {
              name: 'Daughter of B',
              nodeSvgShape:  {
                shape: 'rect',
                shapeProps: {
                  width: 20,
                  height: 20,
                  x: -10,
                  y: -10,
                },
              },
            },
          ],
        },
      ],
    },
  ]