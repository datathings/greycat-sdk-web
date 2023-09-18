# [algebra](/libs/algebra/)::[powerflow](/libs/algebra/powerflow/)::PowerNetwork

## Methods
### fn compute():&nbsp;any?<Badge text="native" />
### fn configure(nbBus:&nbsp;[int](/libs/std/core/type.int.md), nbLines:&nbsp;[int](/libs/std/core/type.int.md), nbExtGrids:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />
### fn createBus(busId:&nbsp;[int](/libs/std/core/type.int.md), vnKv:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />
### fn createExtGrid(busId:&nbsp;[int](/libs/std/core/type.int.md), vmPu:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />
### fn createLine(lineId:&nbsp;[int](/libs/std/core/type.int.md), fromBusId:&nbsp;[int](/libs/std/core/type.int.md), toBusId:&nbsp;[int](/libs/std/core/type.int.md), lenghtKm:&nbsp;[float](/libs/std/core/type.float.md), rOhmPerKm:&nbsp;[float](/libs/std/core/type.float.md), xOhmPerKm:&nbsp;[float](/libs/std/core/type.float.md), cNfPerKm:&nbsp;[float](/libs/std/core/type.float.md), maxIKa:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />
### fn createLoad(busId:&nbsp;[int](/libs/std/core/type.int.md), pMw:&nbsp;[float](/libs/std/core/type.float.md), qMvar:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />
### fn getBusResult(busId:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[PowerBusResult](/libs/algebra/powerflow/type.PowerBusResult.md)<Badge text="native" />
### fn getCheckSum():&nbsp;[Array](/libs/std/core/type.Array.md)<Badge text="native" />
### fn getLineResult(lineId:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;[PowerLineResult](/libs/algebra/powerflow/type.PowerLineResult.md)<Badge text="native" />
### fn nbBus():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn nbExtGrids():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn nbLines():&nbsp;[int](/libs/std/core/type.int.md)<Badge text="native" />
### fn new():&nbsp;[PowerNetwork](/libs/algebra/powerflow/type.PowerNetwork.md)<Badge text="native" /><Badge text="static" />
### fn setMaxIterations(maxIteration:&nbsp;[int](/libs/std/core/type.int.md)):&nbsp;any?<Badge text="native" />
### fn setTolerance(tolerance:&nbsp;[float](/libs/std/core/type.float.md)):&nbsp;any?<Badge text="native" />
