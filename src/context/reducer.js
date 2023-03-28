export const actionType = {
  SET_OP: "SET_OP",
  SET_USER: "SET_USER",
  SET_AP: "SET_AP",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      console.log("SET_USER");
      return {
        ...state,
        user: {
          username: action.user.username,
          filial: action.user.filial,
          controller: action.user.controller,
        },
      };

    case actionType.SET_OP:
      console.log("SET_OP");
      return {
        ...state,
        opData: {
          codigo: action.opData.codigo,
          codbel: action.opData.codbel,
          dtvalidade: action.opData.dtvalidade,
          filial: action.opData.filial,
          lote: action.opData.lote,
          op: action.opData.op,
          produto: action.opData.produto,
          qtdpad: action.opData.qtdpad,
        },
      };

    case actionType.SET_AP:
      console.log("SET_AP");
      return {
        ...state,
        apData: {
          id: action.apData.id,
          codigo: action.apData.codigo,
          dt_fim: action.apData.dt_fim,
          dt_inicio: action.apData.dt_inicio,
          dtvalidade: action.apData.dtvalidade,
          filial: action.apData.filial,
          hr_fim: action.apData.hr_fim,
          hr_inicio: action.apData.hr_inicio,
          lote: action.apData.lote,
          numero: action.apData.numero,
          op: action.apData.op,
          produto: action.apData.produto,
          quantidade: action.apData.quantidade,
          usuario: action.apData.usuario,
        },
      };

    default:
      return state;
  }
};

export default reducer;
