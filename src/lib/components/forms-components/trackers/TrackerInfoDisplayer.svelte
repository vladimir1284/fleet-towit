<script lang="ts">
    import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime'
	dayjs.extend(relativeTime)

    export let data: any;
</script>
<div class="flex flex-col">
    <strong>{data.vehicle.tracker.name}</strong>
    <span>{data.vehicle.type + '-' + data.vehicle.make + '-' + data.vehicle.model}</span>
    <span>Vin: {data.vehicle.vin}</span>
    <span>Plate: {data.vehicle.plate.plate || '-'}</span>
    <span>Lat: {data.latitude}</span>
    <span>Lng: {data.longitude}</span>
    <span>Time: {dayjs().to(data.timeStamp)}</span>
</div>